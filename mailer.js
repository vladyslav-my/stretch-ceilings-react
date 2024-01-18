import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const { EMAIL_HOST, EMAIL_HOST_PASSWORD, EMAIL_HOST_USER, EMAIL_PORT } =
    process.env;


console.log(process.env.EMAIL_HOST);

class Mail {
    #transporter = null;

    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter() {
        return nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD,
            },
        });
    }

    async send(options) {
        try {
            const info = await this.#transporter.sendMail({
                to: EMAIL_HOST_USER,
                subject: "NavatorV",
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>NavatorV Offer</title>
                    <style>
                        .container {
                            font-family: Arial, sans-serif;
                            color: #333;
                            padding: 20px;
                            text-align: center;
                        }
                
                        .card {
                            background-color: #f2f2f2;
                            margin: 10px auto;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                            max-width: 300px;
                            display: inline-block;
                        }
                
                        .card h2 {
                            color: #007bff;
                        }
                
                        .card p {
                            color: #555;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1 style="color: #007bff;">NavatorV</h1>
                
                        <!-- Картка 1 -->
                        <div class="card">
                            <h2>Номер</h2>
                            <p>${options.number}</p>
                        </div>
                    
                
                        <!-- Картка 2 -->
                        <div class="card">
                            <h2>Ціна</h2>
                            <p>${options.price}₴</p>
                        </div>
                
                        <!-- Картка 3 -->
                        <div class="card">
                            <h2>Покриття</h2>
                            <p>${options.coverage}</p>
                        </div>
                
                        <!-- Картка 4 -->
                        <div class="card">
                            <h2>м²</h2>
                            <p>${options.squareMeters}</p>
                        </div>                
                    </div>
                </body>
                </html>
                    `,
            });
            console.log("Email sent successfully:", info);

            return info.messageId;
        } catch (e) {
            console.error("Error sending email:", e);
            return e;
        }
    }
}

export default new Mail();