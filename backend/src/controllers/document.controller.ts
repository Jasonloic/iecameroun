import { Request, Response, NextFunction } from 'express';
import { Document } from '../models';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middlewares/error.middleware';
import fs from 'fs';
import path from 'path';

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const where: Record<string, unknown> = {};
        if (!req.user) where.estPublic = true;
        if (req.query.type) where.type = req.query.type;

        const documents = await Document.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
        sendSuccess(res, documents, 'Documents récupérés');
    } catch (err) {
        next(err);
    }
};

export const upload = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.file) return next(new AppError('Aucun fichier fourni', 400));

        const { titre, description, type, estPublic } = req.body;

        const doc = await Document.create({
            titre,
            description: description || null,
            type: type || 'autre',
            cheminFichier: req.file.path,
            nomFichierOriginal: req.file.originalname,
            tailleFichier: req.file.size,
            mimeType: req.file.mimetype,
            estPublic: estPublic === 'true' || estPublic === true,
        });

        sendSuccess(res, doc, 'Document chargé avec succès', 201);
    } catch (err) {
        next(err);
    }
};

export const download = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return next(new AppError('Document introuvable', 404));
        if (!doc.estPublic && !req.user) return next(new AppError('Accès refusé', 403));

        doc.increment('telechargements').catch(() => {});

        const absolutePath = path.resolve(doc.cheminFichier);
        res.download(absolutePath, doc.nomFichierOriginal);
    } catch (err) {
        next(err);
    }
};

export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return next(new AppError('Document introuvable', 404));

        fs.unlink(doc.cheminFichier, () => {});
        await doc.destroy();
        sendSuccess(res, null, 'Document supprimé');
    } catch (err) {
        next(err);
    }
};