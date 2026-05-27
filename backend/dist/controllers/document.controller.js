"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.download = exports.upload = exports.getAll = void 0;
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const error_middleware_1 = require("../middlewares/error.middleware");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAll = async (req, res, next) => {
    try {
        const where = {};
        if (!req.user)
            where.estPublic = true;
        if (req.query.type)
            where.type = req.query.type;
        const documents = await models_1.Document.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
        (0, apiResponse_1.sendSuccess)(res, documents, 'Documents récupérés');
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const upload = async (req, res, next) => {
    try {
        if (!req.file)
            return next(new error_middleware_1.AppError('Aucun fichier fourni', 400));
        const { titre, description, type, estPublic } = req.body;
        const doc = await models_1.Document.create({
            titre,
            description: description || null,
            type: type || 'autre',
            cheminFichier: req.file.path,
            nomFichierOriginal: req.file.originalname,
            tailleFichier: req.file.size,
            mimeType: req.file.mimetype,
            estPublic: estPublic === 'true' || estPublic === true,
        });
        (0, apiResponse_1.sendSuccess)(res, doc, 'Document chargé avec succès', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.upload = upload;
const download = async (req, res, next) => {
    try {
        const doc = await models_1.Document.findByPk(req.params.id);
        if (!doc)
            return next(new error_middleware_1.AppError('Document introuvable', 404));
        if (!doc.estPublic && !req.user)
            return next(new error_middleware_1.AppError('Accès refusé', 403));
        doc.increment('telechargements').catch(() => { });
        const absolutePath = path_1.default.resolve(doc.cheminFichier);
        res.download(absolutePath, doc.nomFichierOriginal);
    }
    catch (err) {
        next(err);
    }
};
exports.download = download;
const remove = async (req, res, next) => {
    try {
        const doc = await models_1.Document.findByPk(req.params.id);
        if (!doc)
            return next(new error_middleware_1.AppError('Document introuvable', 404));
        fs_1.default.unlink(doc.cheminFichier, () => { });
        await doc.destroy();
        (0, apiResponse_1.sendSuccess)(res, null, 'Document supprimé');
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
//# sourceMappingURL=document.controller.js.map