import Sequelize from 'sequelize';
import dataConfig from '../config/database.js';
import Employee from '../models/Employee.js';

const models = [Employee];

const connection = new Sequelize(dataConfig);

models.forEach(model => model.init(connection));
