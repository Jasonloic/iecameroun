import { Router } from 'express';
import * as ctrl from '../controllers/analytics.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/dashboard', ctrl.getDashboard);
router.get('/zones', ctrl.getVisitesParZone);
router.get('/temps', ctrl.getVisitesDansLeTemps);
router.get('/pages', ctrl.getPagesPopulaires);

export default router;