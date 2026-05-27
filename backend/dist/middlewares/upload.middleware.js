"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadDocument = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const env_1 = require("../config/env");
const documentStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${(0, uuid_1.v4)()}${ext}`);
    },
});
const documentFilter = (_req, file, cb) => {
    if (env_1.env.upload.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Type de fichier non autorisé: ${file.mimetype}`));
    }
};
exports.uploadDocument = (0, multer_1.default)({
    storage: documentStorage,
    fileFilter: documentFilter,
    limits: { fileSize: env_1.env.upload.maxSizeMb * 1024 * 1024 },
});
const imageStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/images/'),
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${(0, uuid_1.v4)()}${ext}`);
    },
});
const imageFilter = (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype))
        cb(null, true);
    else
        cb(new Error(`Image non autorisée: ${file.mimetype}`));
};
exports.uploadImage = (0, multer_1.default)({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
//# sourceMappingURL=upload.middleware.js.map