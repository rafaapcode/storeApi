import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';
import employeeRoute from './src/routes/employeeRoute';

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
  }
}

export default new App().app;
