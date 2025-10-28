import { generateSignature, buildSignatureBaseString } from "~/server/lib/modulbankSignature";
import { randomBytes } from "node:crypto";

// Генерирует безопасный salt из печатных ASCII (hex), длиной до 32 символов
function generateSalt(len = 16) {
  return randomBytes(len).toString("hex").slice(0, 32);
}

// Нормализует сумму для API (целое число в строке)
function normalizeAmount(val) {
  const n = Number(val);
  return String(Math.round(n));
}

// Формирует тело application/x-www-form-urlencoded без пустых полей
function toFormData(obj) {
  const form = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") form.append(k, String(v));
  });
  return form;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody(event).catch(() => ({}));
  const amount = Number(body?.amount);
  const orderId = `${body?.orderId || ""}`.trim();
  const description = `${body?.description || "Оплата счета"}`;
  const withImage = body?.withImage === 0 || body?.withImage === false ? false : true; // по умолчанию возвращаем и картинку, и ссылку
  const qrLifetime = body?.qrLifetime ? Number(body.qrLifetime) : undefined; // минуты

  if (!amount || amount <= 0 || !Number.isFinite(amount)) {
    setResponseStatus(event, 400);
    return { status: "error", message: "Некорректная сумма" };
  }
  if (!orderId) {
    setResponseStatus(event, 400);
    return { status: "error", message: "orderId обязателен" };
  }

  const merchant = config.modulbankShopId; // shop_id/merchant
  // Тестовый режим → используем только тестовый ключ
  const secretKey = config.modulbankTestKey;
  const apiUrl = config.modulbankSbpUrl; // URL берём только из env

  if (!merchant || !secretKey || !apiUrl) {
    setResponseStatus(event, 500);
    return { status: "error", message: "Отсутствуют настройки Modulbank (merchant/secret/apiUrl)" };
  }

  // обязательные поля по документации
  const unixTimestamp = Math.floor(Date.now() / 1000).toString();
  const salt = generateSalt();

  // Чеки (включаем только если явно разрешено в env)
  const receiptsEnabled =
    `${config.modulbankEnableReceipts || ""}`.toLowerCase() === "true" ||
    `${config.modulbankEnableReceipts || ""}` === "1";
  const receiptContact = receiptsEnabled
    ? body?.clientEmail
      ? `${body.clientEmail}`
      : ""
    : undefined;
  const receiptSno = receiptsEnabled ? config.modulbankReceiptSno || "osn" : undefined;
  const receiptVat = receiptsEnabled ? config.modulbankReceiptVat || "none" : undefined;
  const receiptItems = receiptsEnabled
    ? [
        {
          name: description,
          price: Math.round(amount),
          quantity: 1,
          payment_method: "full_prepayment",
          payment_object: "service",
          sno: receiptSno,
          vat: receiptVat,
        },
      ]
    : undefined;

  const payload = {
    merchant, // идентификатор магазина
    amount: normalizeAmount(amount),
    order_id: orderId,
    description,
    unix_timestamp: unixTimestamp,
    salt,
    testing: "1", // тестовый режим включён (требует тестовый ключ)
    ...(receiptsEnabled && receiptContact ? { receipt_contact: receiptContact } : {}),
    ...(receiptsEnabled && receiptItems ? { receipt_items: JSON.stringify(receiptItems) } : {}),
  };

  if (typeof qrLifetime === "number" && Number.isFinite(qrLifetime)) {
    payload.qr_lifetime = qrLifetime.toString();
  }

  const signatureBase = buildSignatureBaseString(payload);
  const signature = generateSignature(payload, secretKey);
  const signed = { ...payload, signature };

  if (process.env.NODE_ENV !== "production") {
    // Логи для отладки 401 (без секретов)
    console.info("[Modulbank SBP] URL:", apiUrl);
    console.info("[Modulbank SBP] Merchant:", merchant);
    console.info("[Modulbank SBP] BaseString:", signatureBase);
    console.info("[Modulbank SBP] Signature:", signature);
  }

  try {
    const form = toFormData(signed);
    const response = await $fetch(apiUrl, {
      method: "POST",
      body: form,
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    });

    // Ответ:
    // { status: 'ok', sbp_link: 'https://...' } — для qr_image=0
    // image/png — для qr_image=1

    if (response?.status === "ok" && response?.sbp_link) {
      let qrImageDataUrl;

      if (withImage) {
        // Для картинки делаем новый запрос с qr_image=1
        const imgPayload = {
          ...payload,
          unix_timestamp: Math.floor(Date.now() / 1000).toString(),
          salt: generateSalt(),
          qr_image: 1,
        };
        const imgSignature = generateSignature(imgPayload, secretKey);
        const imgSigned = { ...imgPayload, signature: imgSignature };

        try {
          const imgForm = toFormData(imgSigned);
          const arrayBuffer = await $fetch(apiUrl, {
            method: "POST",
            body: imgForm,
            headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "image/png" },
            responseType: "arrayBuffer",
          });
          const base64 = Buffer.from(arrayBuffer).toString("base64");
          qrImageDataUrl = `data:image/png;base64,${base64}`;
        } catch (e) {
          // Если получение картинки не удалось — не падаем, вернём только ссылку
          qrImageDataUrl = undefined;
        }
      }

      return {
        status: "ok",
        paymentUrl: response.sbp_link,
        qrImageDataUrl,
        // Время жизни можно оценить из qr_lifetime, если передали
        expiresAt: qrLifetime ? Date.now() + qrLifetime * 60 * 1000 : undefined,
      };
    }

    setResponseStatus(event, 502);
    const base = { status: "error", message: "Некорректный ответ от Modulbank", details: response };
    if (process.env.NODE_ENV !== "production") {
      return { ...base, debug: { signatureBase, signedKeys: Object.keys(signed) } };
    }
    return base;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[Modulbank SBP] Error:", error?.message);
      if (error?.data) console.error("[Modulbank SBP] Error data:", error.data);
    }
    setResponseStatus(event, 502);
    return {
      error: error,
      status: "error",
      message: error?.message || "Ошибка запроса к Modulbank",
      details: error?.data,
    };
  }
});
