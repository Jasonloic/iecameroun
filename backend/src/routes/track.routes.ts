import { Router } from 'express';
import { trackPage } from '../controllers/track.controller';

const router = Router();


router.post('/', trackPage);

export default router;