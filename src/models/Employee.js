import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      faturamento_mes: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      comissao: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      cargo: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async employee => {
      if (employee.password) {
        employee.password_hash = await bcryptjs.hash(employee.password, 8);
      }

      employee.comissao = employee.faturamento_mes * 0.05;
    });
    return this;
  }
}
