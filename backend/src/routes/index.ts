import { Router } from 'express';
import authRoutes from './auth.routes';
import actualiteRoutes from './actualite.routes';
import documentRoutes from './document.routes';
import newsletterRoutes from './newsletter.routes';
import analyticsRoutes from './analytics.routes';
import trackRoutes from './track.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/actualites', actualiteRoutes);
router.use('/documents', documentRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/track', trackRoutes);

export default router;