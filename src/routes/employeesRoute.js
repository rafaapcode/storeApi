import Router from 'express';
import ExployeeController from '../controllers/EmployeeController.js';

const employeeRoute = new Router();

employeeRoute.get('/', ExployeeController.index);

export default employeeRoute;
