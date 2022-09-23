import Router from 'express';
import ProductController from '../controllers/ProductController';
import verifyToken from '../middlewares/verifyToken.js';

const productRoute = new Router();

productRoute.get('/', ProductController.index);
productRoute.get('/:id', ProductController.show);
productRoute.post('/', verifyToken, ProductController.storage);
productRoute.put('/:id?', verifyToken, ProductController.update);
productRoute.delete('/:id?', verifyToken, ProductController.delete);

export default productRoute;
