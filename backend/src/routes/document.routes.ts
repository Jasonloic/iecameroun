import { Router } from 'express';
import { body, param } from 'express-validator';
import * as ctrl from '../controllers/document.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { uploadDocument } from '../middlewares/upload.middleware';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id/download', param('id').isInt(), validateRequest, ctrl.download);
router.post('/',
    authenticate,
    authorize('admin', 'editeur'),
    uploadDocument.single('fichier'),
    [body('titre').trim().notEmpty()],
    validateRequest,
    ctrl.upload
);
router.delete('/:id', authenticate, authorize('admin'), param('id').isInt(), validateRequest, ctrl.remove);

export default router;