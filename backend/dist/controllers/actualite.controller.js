"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const error_middleware_1 = require("../middlewares/error.middleware");
const fs_1 = __importDefault(require("fs"));
const getAll = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, parseInt(req.query.limit) || 10);
        const offset = (page - 1) * limit;
        const { categorie, search } = req.query;
        const where = {};
        if (!req.user)
            where.estPublie = true;
        if (categorie)
            where.categorie = categorie;
        if (search) {
            where[sequelize_1.Op.or] = [
                { titre: { [sequelize_1.Op.like]: `%${search}%` } },
                { resume: { [sequelize_1.Op.like]: `%${search}%` } },
            ];
        }
        const { count, rows } = await models_1.Actualite.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            attributes: { exclude: ['contenu'] },
        });
        (0, apiResponse_1.sendSuccess)(res, rows, 'Actualités récupérées', 200, {
            total: count,
            page,
            totalPages: Math.ceil(count / limit),
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const getOne = async (req, res, next) => {
    try {
        const actualite = await models_1.Actualite.findByPk(req.params.id);
        if (!actualite)
            return next(new error_middleware_1.AppError('Actualité introuvable', 404));
        if (!actualite.estPublie && !req.user)
            return next(new error_middleware_1.AppError('Accès refusé', 403));
        actualite.increment('vues').catch(() => { });
        (0, apiResponse_1.sendSuccess)(res, actualite, 'Actualité récupérée');
    }
    catch (err) {
        next(err);
    }
};
exports.getOne = getOne;
const create = async (req, res, next) => {
    try {
        const { titre, contenu, resume, categorie, auteur, estPublie } = req.body;
        const imageCover = req.file ? req.file.path : null;
        const actualite = await models_1.Actualite.create({
            titre,
            contenu,
            resume,
            categorie,
            auteur,
            estPublie: estPublie === 'true' || estPublie === true,
            imageCover,
        });
        (0, apiResponse_1.sendSuccess)(res, actualite, 'Actualité créée', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const actualite = await models_1.Actualite.findByPk(req.params.id);
        if (!actualite)
            return next(new error_middleware_1.AppError('Actualité introuvable', 404));
        if (req.file && actualite.imageCover) {
            fs_1.default.unlink(actualite.imageCover, () => { });
        }
        const updateData = { ...req.body };
        if (req.file)
            updateData.imageCover = req.file.path;
        if (req.body.estPublie !== undefined) {
            updateData.estPublie = req.body.estPublie === 'true' || req.body.estPublie === true;
        }
        await actualite.update(updateData);
        (0, apiResponse_1.sendSuccess)(res, actualite, 'Actualité mise à jour');
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const actualite = await models_1.Actualite.findByPk(req.params.id);
        if (!actualite)
            return next(new error_middleware_1.AppError('Actualité introuvable', 404));
        if (actualite.imageCover)
            fs_1.default.unlink(actualite.imageCover, () => { });
        await actualite.destroy();
        (0, apiResponse_1.sendSuccess)(res, null, 'Actualité supprimée');
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
//# sourceMappingURL=actualite.controller.js.map