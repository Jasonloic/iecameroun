import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middlewares/error.middleware';
import { env } from '../config/env';

const signToken = (id: number, role: string): string =>
    jwt.sign(
        { id, role },
        env.jwt.secret,
        { expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'] }
    );

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, motDePasse } = req.body;

        const admin = await Admin.findOne({ where: { email, estActif: true } });

        if (!admin || !(await admin.verifierMotDePasse(motDePasse))) {
            return next(new AppError('Identifiants incorrects', 401));
        }

        const token = signToken(admin.id, admin.role ?? 'editeur');
        const { motDePasse: _, ...adminSansMotDePasse } = admin.toJSON();

        sendSuccess(res, { token, admin: adminSansMotDePasse }, 'Connexion réussie');
    } catch (err) {
        next(err);
    }
};

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { nom, email, motDePasse, role } = req.body;

        const existant = await Admin.findOne({ where: { email } });
        if (existant) return next(new AppError('Cet email est déjà utilisé', 409));

        const admin = await Admin.create({ nom, email, motDePasse, role });
        const { motDePasse: _, ...adminSansMotDePasse } = admin.toJSON();

        sendSuccess(res, adminSansMotDePasse, 'Compte créé', 201);
    } catch (err) {
        next(err);
    }
};

export const me = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const admin = await Admin.findByPk(req.user!.id, {
            attributes: { exclude: ['motDePasse'] },
        });
        if (!admin) return next(new AppError('Compte introuvable', 404));
        sendSuccess(res, admin, 'Profil récupéré');
    } catch (err) {
        next(err);
    }
};

export const changerMotDePasse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { ancienMotDePasse, nouveauMotDePasse } = req.body;

        const admin = await Admin.findByPk(req.user!.id);
        if (!admin) return next(new AppError('Compte introuvable', 404));

        if (!(await admin.verifierMotDePasse(ancienMotDePasse))) {
            return next(new AppError('Ancien mot de passe incorrect', 401));
        }

        if (ancienMotDePasse === nouveauMotDePasse) {
            return next(new AppError('Le nouveau mot de passe doit être différent', 400));
        }

        await admin.update({ motDePasse: nouveauMotDePasse });
        sendSuccess(res, null, 'Mot de passe modifié');
    } catch (err) {
        next(err);
    }
};