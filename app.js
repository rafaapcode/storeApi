import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';

import employeeRoute from './src/routes/employeeRoute';
import tokenRoute from './src/routes/tokenRoute';
import productRoute from './src/routes/productRoute';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/employees?', employeeRoute);
    this.app.use('/token', tokenRoute);
    this.app.use('/product', productRoute);
  }
}

export default new App().app;
