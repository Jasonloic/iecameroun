import { Request, Response, NextFunction } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const errorHandler: (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => void;
export declare const notFoundHandler: (_req: Request, res: Response) => void;
//# sourceMappingURL=error.middleware.d.ts.map