import Router from 'express';
import EmployeeController from '../controllers/EmployeeController';

const employeeRoute = new Router();

employeeRoute.get('/', EmployeeController.index);

export default employeeRoute;
