import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { env } from '../config/env';

const documentStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    },
});

const documentFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    if (env.upload.allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Type de fichier non autorisé: ${file.mimetype}`));
    }
};

export const uploadDocument = multer({
    storage: documentStorage,
    fileFilter: documentFilter,
    limits: { fileSize: env.upload.maxSizeMb * 1024 * 1024 },
});

const imageStorage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/images/'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    },
});

const imageFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error(`Image non autorisée: ${file.mimetype}`));
};

export const uploadImage = multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});