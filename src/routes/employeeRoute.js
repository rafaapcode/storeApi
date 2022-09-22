import Router from 'express';
import EmployeeController from '../controllers/EmployeeController';
import checkCPF from '../middlewares/checkCpf.js';

const employeeRoute = new Router();

employeeRoute.get('/', EmployeeController.index);
employeeRoute.get('/:id', EmployeeController.show);
employeeRoute.post('/', checkCPF, EmployeeController.storage);
employeeRoute.put('/:id?', EmployeeController.update);
employeeRoute.delete('/:id?', EmployeeController.delete);

export default employeeRoute;
