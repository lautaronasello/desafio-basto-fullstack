import { Router } from 'express';
import {
  createAnimal,
  deleteAnimal,
  editAnimals,
  getAnimalById,
  getAnimals,
} from '../controllers/animals.controllers.js';

const router = Router();

router.post('/animal', getAnimals);
router.get('/animal/:id', getAnimalById);
router.post('/animal/create', createAnimal);
router.put('/animal/:id', editAnimals);
router.delete('/animal/:id', deleteAnimal);

export default router;
