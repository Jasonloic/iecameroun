"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ctrl = __importStar(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
});
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('motDePasse').notEmpty(),
];
const registerValidation = [
    (0, express_validator_1.body)('nom').trim().notEmpty().isLength({ max: 150 }),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('motDePasse').isLength({ min: 8 }).withMessage('8 caractères minimum'),
    (0, express_validator_1.body)('role').optional().isIn(['admin', 'editeur']),
];
const changerMdpValidation = [
    (0, express_validator_1.body)('ancienMotDePasse').notEmpty(),
    (0, express_validator_1.body)('nouveauMotDePasse').isLength({ min: 8 }),
];
router.post('/login', loginLimiter, loginValidation, validate_middleware_1.validateRequest, ctrl.login);
router.post('/register', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('admin'), registerValidation, validate_middleware_1.validateRequest, ctrl.register);
router.get('/me', auth_middleware_1.authenticate, ctrl.me);
router.patch('/changer-mot-de-passe', auth_middleware_1.authenticate, changerMdpValidation, validate_middleware_1.validateRequest, ctrl.changerMotDePasse);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map