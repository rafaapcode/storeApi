import Router from 'express';
import ProductController from '../controllers/ProductController';

const productRoute = new Router();

productRoute.get('/', ProductController.index);
productRoute.get('/:id', ProductController.show);
productRoute.post('/', ProductController.storage);
productRoute.put('/:id?', ProductController.update);
productRoute.delete('/:id?', ProductController.delete);

export default productRoute;
