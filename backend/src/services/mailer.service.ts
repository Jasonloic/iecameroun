import { transporter } from '../config/mailer';
import { env } from '../config/env';

interface MailOptions {
    to: string | string[];
    subject: string;
    html: string;
}

export const sendMail = async (options: MailOptions): Promise<void> => {
    await transporter.sendMail({ from: env.mail.from, ...options });
};

export const sendContactConfirmation = async (
    nom: string,
    email: string
): Promise<void> => {
    await sendMail({
        to: email,
        subject: 'Message reçu — Nous vous répondrons bientôt',
        html: `<p>Bonjour <strong>${nom}</strong>,</p>
           <p>Votre message a bien été reçu. Notre équipe vous répondra dans les meilleurs délais.</p>`,
    });
};

export const sendNewsletterConfirmation = async (
    email: string,
    unsubscribeToken: string
): Promise<void> => {
    const url = `${process.env.FRONTEND_URL}/newsletter/desabonnement?token=${unsubscribeToken}`;
    await sendMail({
        to: email,
        subject: 'Confirmation de votre abonnement à la newsletter',
        html: `<p>Vous êtes bien abonné(e) à notre newsletter.</p>
           <p><a href="${url}">Se désabonner</a></p>`,
    });
};

export const sendNewsletter = async (
    emails: string[],
    subject: string,
    content: string
): Promise<void> => {
    const chunkSize = 50;
    for (let i = 0; i < emails.length; i += chunkSize) {
        const chunk = emails.slice(i, i + chunkSize);
        await sendMail({ to: chunk, subject, html: content });
    }
};