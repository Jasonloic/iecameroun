import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Actualite } from '../models';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middlewares/error.middleware';
import fs from 'fs';

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const offset = (page - 1) * limit;
        const { categorie, search } = req.query;

        const where: Record<string, unknown> = {};
        if (!req.user) where.estPublie = true;
        if (categorie) where.categorie = categorie;
        if (search) {
            where[Op.or as unknown as string] = [
                { titre: { [Op.like]: `%${search}%` } },
                { resume: { [Op.like]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Actualite.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            attributes: { exclude: ['contenu'] },
        });

        sendSuccess(res, rows, 'Actualités récupérées', 200, {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        next(err);
    }
};

export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const actualite = await Actualite.findByPk(req.params.id);
        if (!actualite) return next(new AppError('Actualité introuvable', 404));
        if (!actualite.estPublie && !req.user) return next(new AppError('Accès refusé', 403));

        actualite.increment('vues').catch(() => {});

        sendSuccess(res, actualite, 'Actualité récupérée');
    } catch (err) {
        next(err);
    }
};

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { titre, contenu, resume, categorie, auteur, estPublie } = req.body;
        const imageCover = req.file ? req.file.path : null;

        const actualite = await Actualite.create({
            titre,
            contenu,
            resume,
            categorie,
            auteur,
            estPublie: estPublie === 'true' || estPublie === true,
            imageCover,
        });

        sendSuccess(res, actualite, 'Actualité créée', 201);
    } catch (err) {
        next(err);
    }
};

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const actualite = await Actualite.findByPk(req.params.id);
        if (!actualite) return next(new AppError('Actualité introuvable', 404));

        if (req.file && actualite.imageCover) {
            fs.unlink(actualite.imageCover, () => {});
        }

        const updateData: Partial<Actualite> = { ...req.body };
        if (req.file) updateData.imageCover = req.file.path;
        if (req.body.estPublie !== undefined) {
            updateData.estPublie = req.body.estPublie === 'true' || req.body.estPublie === true;
        }

        await actualite.update(updateData);
        sendSuccess(res, actualite, 'Actualité mise à jour');
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
        const actualite = await Actualite.findByPk(req.params.id);
        if (!actualite) return next(new AppError('Actualité introuvable', 404));

        if (actualite.imageCover) fs.unlink(actualite.imageCover, () => {});

        await actualite.destroy();
        sendSuccess(res, null, 'Actualité supprimée');
    } catch (err) {
        next(err);
    }
};