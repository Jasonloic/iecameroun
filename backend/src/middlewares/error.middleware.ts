import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const isAppError = err instanceof AppError;
    const statusCode = isAppError ? err.statusCode : 500;
    const message = isAppError ? err.message : 'Erreur interne du serveur';

    res.status(statusCode).json({
        success: false,
        message,
        ...(env.nodeEnv === 'development' && { stack: err.stack }),
    });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
    res.status(404).json({ success: false, message: 'Route introuvable' });
};