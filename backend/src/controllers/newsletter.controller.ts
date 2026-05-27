import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Newsletter } from '../models';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middlewares/error.middleware';
import {
    sendNewsletterConfirmation,
    sendNewsletter,
} from '../services/mailer.service';

export const subscribe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email } = req.body;

        const existing = await Newsletter.findOne({ where: { email } });
        if (existing) {
            if (existing.estActif) return next(new AppError('Cet email est déjà abonné', 409));
            await existing.update({ estActif: true });
            sendSuccess(res, null, 'Abonnement réactivé');
            return;
        }

        const token = uuidv4();
        await Newsletter.create({ email, token });
        await sendNewsletterConfirmation(email, token);

        sendSuccess(res, null, 'Abonnement confirmé. Un email vous a été envoyé.', 201);
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { token } = req.params;
        const abonne = await Newsletter.findOne({ where: { token } });
        if (!abonne) return next(new AppError('Token invalide', 404));

        await abonne.update({ estActif: false });
        sendSuccess(res, null, 'Désabonnement effectué');
    } catch (err) {
        next(err);
    }
};

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const abonnes = await Newsletter.findAll({ where: { estActif: true } });
        sendSuccess(res, abonnes, `${abonnes.length} abonné(s) actif(s)`);
    } catch (err) {
        next(err);
    }
};

export const broadcast = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { sujet, contenu } = req.body;
        const abonnes = await Newsletter.findAll({
            where: { estActif: true },
            attributes: ['email'],
        });

        if (abonnes.length === 0) return next(new AppError('Aucun abonné actif', 400));

        const emails = abonnes.map((a) => a.email);
        await sendNewsletter(emails, sujet, contenu);

        sendSuccess(res, { destinataires: emails.length }, 'Newsletter envoyée');
    } catch (err) {
        next(err);
    }
};