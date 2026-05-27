interface MailOptions {
    to: string | string[];
    subject: string;
    html: string;
}
export declare const sendMail: (options: MailOptions) => Promise<void>;
export declare const sendContactConfirmation: (nom: string, email: string) => Promise<void>;
export declare const sendNewsletterConfirmation: (email: string, unsubscribeToken: string) => Promise<void>;
export declare const sendNewsletter: (emails: string[], subject: string, content: string) => Promise<void>;
export {};
//# sourceMappingURL=mailer.service.d.ts.map