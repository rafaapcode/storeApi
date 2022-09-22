import Router from 'express';
import TokenController from '../controllers/TokenController';

const tokenRoute = new Router();

tokenRoute.post('/', TokenController.storage);

export default tokenRoute;
