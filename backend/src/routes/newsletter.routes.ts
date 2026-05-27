import { Router } from 'express';
import { body } from 'express-validator';
import * as ctrl from '../controllers/newsletter.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

router.post('/subscribe', [body('email').isEmail().normalizeEmail()], validateRequest, ctrl.subscribe);
router.get('/unsubscribe/:token', ctrl.unsubscribe);
router.get('/', authenticate, authorize('admin'), ctrl.getAll);
router.post('/broadcast',
    authenticate,
    authorize('admin'),
    [body('sujet').trim().notEmpty(), body('contenu').notEmpty()],
    validateRequest,
    ctrl.broadcast
);

export default router;