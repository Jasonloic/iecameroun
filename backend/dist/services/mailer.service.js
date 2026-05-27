"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewsletter = exports.sendNewsletterConfirmation = exports.sendContactConfirmation = exports.sendMail = void 0;
const mailer_1 = require("../config/mailer");
const env_1 = require("../config/env");
const sendMail = async (options) => {
    await mailer_1.transporter.sendMail({ from: env_1.env.mail.from, ...options });
};
exports.sendMail = sendMail;
const sendContactConfirmation = async (nom, email) => {
    await (0, exports.sendMail)({
        to: email,
        subject: 'Message reçu — Nous vous répondrons bientôt',
        html: `<p>Bonjour <strong>${nom}</strong>,</p>
           <p>Votre message a bien été reçu. Notre équipe vous répondra dans les meilleurs délais.</p>`,
    });
};
exports.sendContactConfirmation = sendContactConfirmation;
const sendNewsletterConfirmation = async (email, unsubscribeToken) => {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    const unsubscribeUrl = `${baseUrl}/newsletter/desabonnement?token=${unsubscribeToken}`;
    await (0, exports.sendMail)({
        to: email,
        subject: 'Bienvenue sur IE237 | Veille - Influence - Protection et Intelligence Économique',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 6px;">
                <h2 style="color: #020817; font-weight: 400; margin-bottom: 20px;">Merci pour votre abonnement</h2>
                <p style="color: #64748b; line-height: 1.6; font-size: 15px;">
                    Vous êtes désormais inscrit à la lettre stratégique d'<strong>IE237</strong>. 
                    Vous recevrez régulièrement nos analyses de souveraineté économique, alertes informationnelles et policy briefs concernant le Cameroun et l'Afrique centrale.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <a href="${unsubscribeUrl}" style="color: #94a3b8; font-size: 12px; text-decoration: underline; hover: color: #64748b;">
                        Se désabonner de la liste
                    </a>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
                    Cet e-mail a été envoyé automatiquement par la plateforme d'Intelligence Économique IE237.
                </p>
            </div>
        `,
    });
};
exports.sendNewsletterConfirmation = sendNewsletterConfirmation;
const sendNewsletter = async (emails, subject, content) => {
    const chunkSize = 50;
    for (let i = 0; i < emails.length; i += chunkSize) {
        const chunk = emails.slice(i, i + chunkSize);
        await (0, exports.sendMail)({ to: chunk, subject, html: content });
    }
};
exports.sendNewsletter = sendNewsletter;
//# sourceMappingURL=mailer.service.js.map