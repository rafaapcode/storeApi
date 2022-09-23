import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';

import { resolve } from 'path';

import employeeRoute from './src/routes/employeeRoute';
import tokenRoute from './src/routes/tokenRoute';
import productRoute from './src/routes/productRoute';
import photoRoute from './src/routes/photoRoute';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/employees?', employeeRoute);
    this.app.use('/token', tokenRoute);
    this.app.use('/product', productRoute);
    this.app.use('/photo', photoRoute);
  }
}

export default new App().app;
