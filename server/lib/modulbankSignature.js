import { createHash } from "node:crypto";

/**
 * Возвращает hex-строку SHA1 для переданной строки.
 */
function sha1Hex(input) {
  return createHash("sha1").update(input, "utf8").digest("hex");
}

/**
 * Преобразует любое значение к строке и кодирует в base64 (UTF-8).
 */
function toBase64(value) {
  const asString =
    value === null || value === undefined
      ? ""
      : typeof value === "object"
      ? JSON.stringify(value)
      : String(value);
  return Buffer.from(asString, "utf8").toString("base64");
}

/**
 * Формирует базовую строку для подписи по правилам Modulbank:
 * - исключает поле signature
 * - исключает пустые значения (null/undefined/пустая строка)
 * - значения кодирует в base64
 * - пары key=base64(value) сортируются по ключу (ASCII) и объединяются через &
 */
export function buildSignatureBaseString(params) {
  if (!params || typeof params !== "object") {
    return "";
  }

  const entries = Object.entries(params)
    .filter(([key]) => key !== "signature")
    .filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.length > 0; // пустые строки исключаем
      return true;
    })
    .map(([key, value]) => [key, toBase64(value)])
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  const parts = entries.map(([key, base64Value]) => `${key}=${base64Value}`);
  return parts.join("&");
}

/**
 * Генерирует подпись Modulbank: SHA1(secret + SHA1(secret + baseString)).
 * baseString формируется функцией buildSignatureBaseString(params).
 */
export function generateSignature(params, secretKey) {
  if (!secretKey || typeof secretKey !== "string") {
    throw new Error("Secret key is required to generate signature");
  }
  const baseString = buildSignatureBaseString(params);
  const inner = sha1Hex(`${secretKey}${sha1Hex(`${secretKey}${baseString}`)}`);
  return inner;
}

/**
 * Проверяет подпись: сравнивает предоставленную signature с вычисленной.
 */
export function verifySignature(paramsWithSignature, secretKey) {
  if (!paramsWithSignature || typeof paramsWithSignature !== "object") return false;
  const provided = `${paramsWithSignature.signature || ""}`.toLowerCase();
  const expected = generateSignature(paramsWithSignature, secretKey).toLowerCase();
  return provided === expected;
}

/**
 * Возвращает новый объект с добавленным полем signature.
 */
export function signPayload(params, secretKey) {
  const signature = generateSignature(params, secretKey);
  return { ...params, signature };
}

export default {
  buildSignatureBaseString,
  generateSignature,
  verifySignature,
  signPayload,
};
