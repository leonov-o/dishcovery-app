import nodemailer from "nodemailer";

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                type: 'login',
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация акаунта Dishcovery',
            text: '',
            html:
                `
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">
<table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <tr>
        <td>
            <h1 style="color: #333;">Ласкаво просимо в Dishcovery!</h1>
            <p style="color: #666; font-size: 16px;">Щоб активувати обліковий запис, натисніть кнопку нижче:</p>
            <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #ffd422; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;">Активувати акаунт</a>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">Якщо кнопка вище не працює, ви також можете скопіювати та вставити це посилання у свій браузер:</p>
            <p style="color: #666; font-size: 14px;"><a href="${link}" style="color: #007bff; text-decoration: none;">${link}</a></p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">Дякуємо, що обираєте Dishcovery!</p>
        </td>
    </tr>
</table>
</body>
                `
        })
    }
}

export const mailService = new MailService();
