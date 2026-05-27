import { Request, Response, NextFunction } from 'express';
export declare const subscribe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const unsubscribe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const broadcast: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=newsletter.controller.d.ts.map