import { Request, Response, NextFunction } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import { Actualite, Visitor, PageView, Newsletter } from '../models';
import { sendSuccess } from '../utils/apiResponse';

export const getDashboard = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const debut30j = new Date();
        debut30j.setDate(debut30j.getDate() - 30);

        const [
            totalActualites,
            actualitesPubliees,
            totalVues,
            totalVisiteurs,
            nouveauxVisiteurs30j,
            totalAbonnes,
        ] = await Promise.all([
            Actualite.count(),
            Actualite.count({ where: { estPublie: true } }),
            Actualite.sum('vues'),
            Visitor.count(),
            Visitor.count({ where: { createdAt: { [Op.gte]: debut30j } } }),
            Newsletter.count({ where: { estActif: true } }),
        ]);

        sendSuccess(res, {
            actualites: { total: totalActualites, publiees: actualitesPubliees },
            vues: totalVues || 0,
            visiteurs: { total: totalVisiteurs, derniers30Jours: nouveauxVisiteurs30j },
            abonnesNewsletter: totalAbonnes,
        }, 'Tableau de bord');
    } catch (err) {
        next(err);
    }
};

export const getVisitesParZone = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const zones = await Visitor.findAll({
            attributes: [
                'pays',
                'region',
                'ville',
                [fn('COUNT', col('Visitor.id')), 'nbVisiteurs'],
            ],
            group: ['pays', 'region', 'ville'],
            order: [[literal('nbVisiteurs'), 'DESC']],
            limit: 50,
        });

        sendSuccess(res, zones, 'Visites par zone');
    } catch (err) {
        next(err);
    }
};

export const getVisitesDansLeTemps = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const jours = parseInt(req.query.jours as string) || 30;
        const debut = new Date();
        debut.setDate(debut.getDate() - jours);

        const visites = await PageView.findAll({
            attributes: [
                [fn('DATE', col('createdAt')), 'date'],
                [fn('COUNT', col('id')), 'vues'],
            ],
            where: { createdAt: { [Op.gte]: debut } },

            group: [literal('DATE(createdAt)') as any],
            order: [[literal('DATE(createdAt)') as any, 'ASC']],
        });

        sendSuccess(res, visites, `Visites sur ${jours} jours`);
    } catch (err) {
        next(err);
    }
};

export const getPagesPopulaires = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const pages = await PageView.findAll({
            attributes: [
                'path',
                [fn('COUNT', col('id')), 'vues'],
            ],
            group: ['path'],
            order: [[literal('vues'), 'DESC']],
            limit: 20,
        });

        sendSuccess(res, pages, 'Pages les plus visitées');
    } catch (err) {
        next(err);
    }
};