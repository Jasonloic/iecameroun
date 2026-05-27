"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackerMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const models_1 = require("../models");
const EXCLUDED_PATHS = ['/api/', '/health', '/uploads'];
const getClientIp = (req) => req.headers['x-forwarded-for']?.split(',')[0].trim()
    || req.socket.remoteAddress
    || 'unknown';
const trackerMiddleware = async (req, _res, next) => {
    next();
    if (EXCLUDED_PATHS.some((p) => req.path.startsWith(p)))
        return;
    try {
        const ip = getClientIp(req);
        const ua = req.headers['user-agent'] || 'unknown';
        const fingerprint = crypto_1.default
            .createHash('sha256')
            .update(`${ip}${ua}`)
            .digest('hex');
        let visitor = await models_1.Visitor.findOne({ where: { fingerprint } });
        if (!visitor) {
            const geo = geoip_lite_1.default.lookup(ip);
            visitor = await models_1.Visitor.create({
                ipAddress: ip,
                userAgent: ua,
                fingerprint,
                pays: geo?.country ?? null,
                region: geo?.region ?? null,
                ville: geo?.city ?? null,
            });
        }
        await models_1.PageView.create({
            visitorId: visitor.id,
            path: req.originalUrl,
            referrer: req.headers.referer ?? null,
        });
    }
    catch {
    }
};
exports.trackerMiddleware = trackerMiddleware;
//# sourceMappingURL=tracker.middleware.js.map