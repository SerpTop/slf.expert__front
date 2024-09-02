import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru", // SMTP сервер вашего почтового провайдера
  port: 587,
  secure: false, // true для портов 465, false для других портов
  auth: {
    user: "a.brusov@serptop.ru", // ваш email
    pass: "serptop9876", // ваш пароль от email
  },
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const options = {
    subject: "Новая заявка с сайта - Юрист Семин А.С.",
    text: `
    Имя: ${body.name}

    Телефон: ${body.phone}

    E-mail: ${body.email}

    Практика: ${body.practic}

    Комментарий: ${body.comment}

    `,
    attachments: body.files.map((file) => {
      if (file) {
        return {
          filename: file.name,
          content: Buffer.from(file.content, "base64"), // предполагается, что файл передается в base64
        };
      }
    }),
  };

  const mailOptions = {
    from: "a.brusov@serptop.ru", // адрес отправителя
    to: "a.brusov@serptop.ru", // адрес получателя
    ...options,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: "success" };
  } catch (error) {
    return { status: "error", message: error.message };
  }
});
