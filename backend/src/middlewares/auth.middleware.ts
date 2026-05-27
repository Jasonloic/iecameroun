import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './error.middleware';

interface JwtPayload {
    id: number;
    role: string;
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return next(new AppError('Token manquant ou invalide', 401));
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, env.jwt.secret) as JwtPayload;
        req.user = payload;
        next();
    } catch {
        next(new AppError('Token invalide ou expiré', 401));
    }
};

export const authorize = (...roles: string[]) =>
    (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('Accès refusé', 403));
        }
        next();
    };