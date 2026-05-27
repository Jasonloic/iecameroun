import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number, meta?: Record<string, unknown>) => Response;
export declare const sendError: (res: Response, message: string, statusCode?: number, errors?: unknown) => Response;
//# sourceMappingURL=apiResponse.d.ts.map