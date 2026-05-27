import { Response } from 'express';

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message = 'Succès',
    statusCode = 200,
    meta?: Record<string, unknown>
): Response => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta }),
    });
};

export const sendError = (
    res: Response,
    message: string,
    statusCode = 500,
    errors?: unknown
): Response => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
    });
};