"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPage = void 0;
const crypto_1 = __importDefault(require("crypto"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const trackPage = async (req, res, next) => {
    try {
        const { path, referrer } = req.body;
        if (!path || typeof path !== 'string') {
            (0, apiResponse_1.sendSuccess)(res, null, 'ignored');
            return;
        }
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim()
            || req.socket.remoteAddress
            || 'unknown';
        const ua = req.headers['user-agent'] || 'unknown';
        const fingerprint = crypto_1.default.createHash('sha256').update(`${ip}${ua}`).digest('hex');
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
            path: path.slice(0, 500),
            referrer: referrer?.slice(0, 500) ?? null,
        });
        (0, apiResponse_1.sendSuccess)(res, null, 'tracked');
    }
    catch (err) {
        next(err);
    }
};
exports.trackPage = trackPage;
//# sourceMappingURL=track.controller.js.map