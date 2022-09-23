import Sequelize from 'sequelize';
import dataConfig from '../config/database.js';
import Employee from '../models/Employee.js';
import Product from '../models/Product.js';
import Photo from '../models/Photo.js';

const models = [Employee, Product, Photo];

const connection = new Sequelize(dataConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
