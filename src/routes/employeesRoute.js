import Router from 'express';
import ExployeeController from '../controllers/EmployeeController.js';

const employeeRoute = new Router();

employeeRoute.get('/', ExployeeController.index);
employeeRoute.get('/:id?', ExployeeController.show);
employeeRoute.post('/', ExployeeController.storage);
employeeRoute.put('/:id?', ExployeeController.update);
employeeRoute.delete('/:id?', ExployeeController.delete);

export default employeeRoute;
