import Router from 'express';
import PhotoController from '../controllers/PhotoController';
import verifyToken from '../middlewares/verifyToken';

const photoRoute = new Router();

photoRoute.post('/', verifyToken, PhotoController.storage);

export default photoRoute;
