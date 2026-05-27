import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import geoip from 'geoip-lite';
import { Visitor, PageView } from '../models';

const EXCLUDED_PATHS = ['/api/', '/health', '/uploads'];

const getClientIp = (req: Request): string =>
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim()
    || req.socket.remoteAddress
    || 'unknown';

export const trackerMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    next();

    if (EXCLUDED_PATHS.some((p) => req.path.startsWith(p))) return;

    try {
        const ip = getClientIp(req);
        const ua = req.headers['user-agent'] || 'unknown';
        const fingerprint = crypto
            .createHash('sha256')
            .update(`${ip}${ua}`)
            .digest('hex');

        let visitor = await Visitor.findOne({ where: { fingerprint } });

        if (!visitor) {
            const geo = geoip.lookup(ip);
            visitor = await Visitor.create({
                ipAddress: ip,
                userAgent: ua,
                fingerprint,
                pays: geo?.country ?? null,
                region: geo?.region ?? null,
                ville: geo?.city ?? null,
            });
        }

        await PageView.create({
            visitorId: visitor.id,
            path: req.originalUrl,
            referrer: (req.headers.referer as string) ?? null,
        });
    } catch {

    }
};