import Sequelize from 'sequelize';
import dataConfig from '../config/database.js';
import Employee from '../models/Employee.js';
import Product from '../models/Product.js';

const models = [Employee, Product];

const connection = new Sequelize(dataConfig);

models.forEach(model => model.init(connection));
