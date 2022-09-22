import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 255],
            msg: 'Name must be at least 5 characters.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists.',
        },
        validate: {
          isEmail: {
            msg: 'Email invalid.',
          },
        },
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [8, 255],
            msg: 'Password must be at least 8 characters',
          },
        },
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'CPF already exists.',
        },
        validate: {
          len: {
            args: [11, 15],
            msg: 'CPF invalid',
          },
        },
      },
      monthly_billing: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      fee: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      position: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 20],
            msg: 'The possition must be a SELLER or MANAGER.',
          },
        },
      },
      password_hash: {
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
      employee.fee = employee.monthly_billing * 0.05;
    });
    return this;
  }

  static checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
