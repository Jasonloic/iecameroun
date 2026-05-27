"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = exports.getAll = exports.unsubscribe = exports.subscribe = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../models");
const apiResponse_1 = require("../utils/apiResponse");
const error_middleware_1 = require("../middlewares/error.middleware");
const mailer_service_1 = require("../services/mailer.service");
const subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        const existing = await models_1.Newsletter.findOne({ where: { email } });
        if (existing) {
            if (existing.estActif)
                return next(new error_middleware_1.AppError('Cet email est déjà abonné', 409));
            await existing.update({ estActif: true });
            (0, apiResponse_1.sendSuccess)(res, null, 'Abonnement réactivé');
            return;
        }
        const token = (0, uuid_1.v4)();
        await models_1.Newsletter.create({ email, token });
        await (0, mailer_service_1.sendNewsletterConfirmation)(email, token);
        (0, apiResponse_1.sendSuccess)(res, null, 'Abonnement confirmé. Un email vous a été envoyé.', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.subscribe = subscribe;
const unsubscribe = async (req, res, next) => {
    try {
        const { token } = req.params;
        const abonne = await models_1.Newsletter.findOne({ where: { token } });
        if (!abonne)
            return next(new error_middleware_1.AppError('Token invalide', 404));
        await abonne.update({ estActif: false });
        (0, apiResponse_1.sendSuccess)(res, null, 'Désabonnement effectué');
    }
    catch (err) {
        next(err);
    }
};
exports.unsubscribe = unsubscribe;
const getAll = async (req, res, next) => {
    try {
        const abonnes = await models_1.Newsletter.findAll({ where: { estActif: true } });
        (0, apiResponse_1.sendSuccess)(res, abonnes, `${abonnes.length} abonné(s) actif(s)`);
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = getAll;
const broadcast = async (req, res, next) => {
    try {
        const { sujet, contenu } = req.body;
        const abonnes = await models_1.Newsletter.findAll({
            where: { estActif: true },
            attributes: ['email'],
        });
        if (abonnes.length === 0)
            return next(new error_middleware_1.AppError('Aucun abonné actif', 400));
        const emails = abonnes.map((a) => a.email);
        await (0, mailer_service_1.sendNewsletter)(emails, sujet, contenu);
        (0, apiResponse_1.sendSuccess)(res, { destinataires: emails.length }, 'Newsletter envoyée');
    }
    catch (err) {
        next(err);
    }
};
exports.broadcast = broadcast;
//# sourceMappingURL=newsletter.controller.js.map