import { Router } from 'express';
import { DevController } from './application/controllers/DevController';
import { SearchController } from './application/controllers/SearchController';

export const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index)