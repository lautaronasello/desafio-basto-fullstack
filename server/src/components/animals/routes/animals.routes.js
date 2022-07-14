import { Router } from 'express';
import {
  createAnimal,
  deleteAnimal,
  editAnimals,
  getAnimalById,
  getAnimals,
  getAnimalSearch,
} from '../controllers/animals.controllers.js';

const router = Router();
router.post('/animal', getAnimals); // pagination service route
router.post('/animal/search', getAnimalSearch);
router.get('/animal/:id', getAnimalById);
router.post('/animal/create', createAnimal);
router.put('/animal/:id', editAnimals);
router.delete('/anima/:id', deleteAnimal);

export default router;
