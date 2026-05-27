"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changerMotDePasse = exports.me = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = require("../models/Admin");
const apiResponse_1 = require("../utils/apiResponse");
const error_middleware_1 = require("../middlewares/error.middleware");
const env_1 = require("../config/env");
const signToken = (id, role) => jsonwebtoken_1.default.sign({ id, role }, env_1.env.jwt.secret, { expiresIn: env_1.env.jwt.expiresIn });
const login = async (req, res, next) => {
    try {
        const { email, motDePasse } = req.body;
        const admin = await Admin_1.Admin.findOne({ where: { email, estActif: true } });
        if (!admin || !(await admin.verifierMotDePasse(motDePasse))) {
            return next(new error_middleware_1.AppError('Identifiants incorrects', 401));
        }
        const token = signToken(admin.id, admin.role ?? 'editeur');
        const { motDePasse: _, ...adminSansMotDePasse } = admin.toJSON();
        (0, apiResponse_1.sendSuccess)(res, { token, admin: adminSansMotDePasse }, 'Connexion réussie');
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const register = async (req, res, next) => {
    try {
        const { nom, email, motDePasse, role } = req.body;
        const existant = await Admin_1.Admin.findOne({ where: { email } });
        if (existant)
            return next(new error_middleware_1.AppError('Cet email est déjà utilisé', 409));
        const admin = await Admin_1.Admin.create({ nom, email, motDePasse, role });
        const { motDePasse: _, ...adminSansMotDePasse } = admin.toJSON();
        (0, apiResponse_1.sendSuccess)(res, adminSansMotDePasse, 'Compte créé', 201);
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
const me = async (req, res, next) => {
    try {
        const admin = await Admin_1.Admin.findByPk(req.user.id, {
            attributes: { exclude: ['motDePasse'] },
        });
        if (!admin)
            return next(new error_middleware_1.AppError('Compte introuvable', 404));
        (0, apiResponse_1.sendSuccess)(res, admin, 'Profil récupéré');
    }
    catch (err) {
        next(err);
    }
};
exports.me = me;
const changerMotDePasse = async (req, res, next) => {
    try {
        const { ancienMotDePasse, nouveauMotDePasse } = req.body;
        const admin = await Admin_1.Admin.findByPk(req.user.id);
        if (!admin)
            return next(new error_middleware_1.AppError('Compte introuvable', 404));
        if (!(await admin.verifierMotDePasse(ancienMotDePasse))) {
            return next(new error_middleware_1.AppError('Ancien mot de passe incorrect', 401));
        }
        if (ancienMotDePasse === nouveauMotDePasse) {
            return next(new error_middleware_1.AppError('Le nouveau mot de passe doit être différent', 400));
        }
        await admin.update({ motDePasse: nouveauMotDePasse });
        (0, apiResponse_1.sendSuccess)(res, null, 'Mot de passe modifié');
    }
    catch (err) {
        next(err);
    }
};
exports.changerMotDePasse = changerMotDePasse;
//# sourceMappingURL=auth.controller.js.map