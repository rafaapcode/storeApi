import Router from 'express';
import EmployeeController from '../controllers/EmployeeController';
import checkCPF from '../middlewares/checkCpf.js';
import verifyToken from '../middlewares/verifyToken.js';

const employeeRoute = new Router();

employeeRoute.get('/', EmployeeController.index);
employeeRoute.get('/:id', EmployeeController.show);
employeeRoute.post('/', verifyToken, checkCPF, EmployeeController.storage);
employeeRoute.put('/:id?', verifyToken, EmployeeController.update);
employeeRoute.delete('/:id?', verifyToken, EmployeeController.delete);

export default employeeRoute;
