import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import * as ctrl from '../controllers/auth.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Trop de tentatives. Réessayez dans 15 minutes.' },
});

const loginValidation = [
    body('email').isEmail().normalizeEmail(),
    body('motDePasse').notEmpty(),
];

const registerValidation = [
    body('nom').trim().notEmpty().isLength({ max: 150 }),
    body('email').isEmail().normalizeEmail(),
    body('motDePasse').isLength({ min: 8 }).withMessage('8 caractères minimum'),
    body('role').optional().isIn(['admin', 'editeur']),
];

const changerMdpValidation = [
    body('ancienMotDePasse').notEmpty(),
    body('nouveauMotDePasse').isLength({ min: 8 }),
];

router.post('/login', loginLimiter, loginValidation, validateRequest, ctrl.login);
router.post('/register', authenticate, authorize('admin'), registerValidation, validateRequest, ctrl.register);
router.get('/me', authenticate, ctrl.me);
router.patch('/changer-mot-de-passe', authenticate, changerMdpValidation, validateRequest, ctrl.changerMotDePasse);

export default router;