"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const required = (key) => {
    const value = process.env[key];
    if (!value)
        throw new Error(`Missing required env variable: ${key}`);
    return value;
};
exports.env = {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    db: {
        host: required('DB_HOST'),
        port: parseInt(process.env.DB_PORT || '3306', 10),
        name: required('DB_NAME'),
        user: required('DB_USER'),
        pass: process.env.DB_PASS || '',
    },
    jwt: {
        secret: required('JWT_SECRET'),
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    mail: {
        host: required('MAIL_HOST'),
        port: parseInt(process.env.MAIL_PORT || '587', 10),
        secure: process.env.MAIL_SECURE === 'true',
        user: required('MAIL_USER'),
        pass: required('MAIL_PASS'),
        from: process.env.MAIL_FROM || 'noreply@example.com',
    },
    upload: {
        maxSizeMb: parseInt(process.env.UPLOAD_MAX_SIZE_MB || '10', 10),
        allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES ||
            'application/pdf').split(','),
    },
};
//# sourceMappingURL=env.js.map