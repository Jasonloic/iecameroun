import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import geoip from 'geoip-lite';
import { Visitor, PageView } from '../models';
import { sendSuccess } from '../utils/apiResponse';

export const trackPage = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { path, referrer } = req.body as { path: string; referrer?: string };

        if (!path || typeof path !== 'string') {
            sendSuccess(res, null, 'ignored');
            return;
        }

        const ip =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim()
            || req.socket.remoteAddress
            || 'unknown';
        const ua          = req.headers['user-agent'] || 'unknown';
        const fingerprint = crypto.createHash('sha256').update(`${ip}${ua}`).digest('hex');

        let visitor = await Visitor.findOne({ where: { fingerprint } });

        if (!visitor) {
            const geo = geoip.lookup(ip);
            visitor   = await Visitor.create({
                ipAddress: ip,
                userAgent: ua,
                fingerprint,
                pays:   geo?.country ?? null,
                region: geo?.region  ?? null,
                ville:  geo?.city    ?? null,
            });
        }

        await PageView.create({
            visitorId: visitor.id,
            path:      path.slice(0, 500),
            referrer:  referrer?.slice(0, 500) ?? null,
        });

        sendSuccess(res, null, 'tracked');
    } catch (err) {
        next(err);
    }
};