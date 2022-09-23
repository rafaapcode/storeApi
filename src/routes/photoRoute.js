import Router from 'express';
import PhotoController from '../controllers/PhotoController';

const photoRoute = new Router();

photoRoute.post('/', PhotoController.storage);

export default photoRoute;
