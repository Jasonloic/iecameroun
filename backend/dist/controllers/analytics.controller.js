"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesPopulaires = exports.getVisitesDansLeTemps = exports.getVisitesParZone = exports.getDashboard = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const getDashboard = async (_req, res, next) => {
    try {
        const debut30j = new Date();
        debut30j.setDate(debut30j.getDate() - 30);
        const [totalActualites, actualitesPubliees, totalVues, totalVisiteurs, nouveauxVisiteurs30j, totalAbonnes,] = await Promise.all([
            models_1.Actualite.count(),
            models_1.Actualite.count({ where: { estPublie: true } }),
            models_1.Actualite.sum('vues'),
            models_1.Visitor.count(),
            models_1.Visitor.count({ where: { createdAt: { [sequelize_1.Op.gte]: debut30j } } }),
            models_1.Newsletter.count({ where: { estActif: true } }),
        ]);
        (0, apiResponse_1.sendSuccess)(res, {
            actualites: { total: totalActualites, publiees: actualitesPubliees },
            vues: totalVues || 0,
            visiteurs: { total: totalVisiteurs, derniers30Jours: nouveauxVisiteurs30j },
            abonnesNewsletter: totalAbonnes,
        }, 'Tableau de bord');
    }
    catch (err) {
        next(err);
    }
};
exports.getDashboard = getDashboard;
const getVisitesParZone = async (_req, res, next) => {
    try {
        const zones = await models_1.Visitor.findAll({
            attributes: [
                'pays',
                'region',
                'ville',
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('Visitor.id')), 'nbVisiteurs'],
            ],
            group: ['pays', 'region', 'ville'],
            order: [[(0, sequelize_1.literal)('nbVisiteurs'), 'DESC']],
            limit: 50,
        });
        (0, apiResponse_1.sendSuccess)(res, zones, 'Visites par zone');
    }
    catch (err) {
        next(err);
    }
};
exports.getVisitesParZone = getVisitesParZone;
const getVisitesDansLeTemps = async (req, res, next) => {
    try {
        const jours = parseInt(req.query.jours) || 30;
        const debut = new Date();
        debut.setDate(debut.getDate() - jours);
        const visites = await models_1.PageView.findAll({
            attributes: [
                [(0, sequelize_1.fn)('DATE', (0, sequelize_1.col)('createdAt')), 'date'],
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('id')), 'vues'],
            ],
            where: { createdAt: { [sequelize_1.Op.gte]: debut } },
            group: [(0, sequelize_1.literal)('DATE(createdAt)')],
            order: [[(0, sequelize_1.literal)('DATE(createdAt)'), 'ASC']],
        });
        (0, apiResponse_1.sendSuccess)(res, visites, `Visites sur ${jours} jours`);
    }
    catch (err) {
        next(err);
    }
};
exports.getVisitesDansLeTemps = getVisitesDansLeTemps;
const getPagesPopulaires = async (_req, res, next) => {
    try {
        const pages = await models_1.PageView.findAll({
            attributes: [
                'path',
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('id')), 'vues'],
            ],
            group: ['path'],
            order: [[(0, sequelize_1.literal)('vues'), 'DESC']],
            limit: 20,
        });
        (0, apiResponse_1.sendSuccess)(res, pages, 'Pages les plus visitées');
    }
    catch (err) {
        next(err);
    }
};
exports.getPagesPopulaires = getPagesPopulaires;
//# sourceMappingURL=analytics.controller.js.map