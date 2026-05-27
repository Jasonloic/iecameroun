import { Router } from 'express';
import { body, param } from 'express-validator';
import * as ctrl from '../controllers/actualite.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { validateRequest } from '../middlewares/validate.middleware';

const router = Router();

const actualiteValidation = [
    body('titre').trim().notEmpty().isLength({ max: 255 }),
    body('contenu').notEmpty(),
    body('resume').trim().notEmpty().isLength({ max: 500 }),
    body('categorie').trim().notEmpty(),
    body('auteur').trim().notEmpty(),
];

router.get('/', ctrl.getAll);
router.get('/:id', param('id').isInt(), validateRequest, ctrl.getOne);
router.post('/', authenticate, authorize('admin', 'editeur'), uploadImage.single('imageCover'), actualiteValidation, validateRequest, ctrl.create);
router.put('/:id', authenticate, authorize('admin', 'editeur'), uploadImage.single('imageCover'), validateRequest, ctrl.update);
router.delete('/:id', authenticate, authorize('admin'), param('id').isInt(), validateRequest, ctrl.remove);

export default router;