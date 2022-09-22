import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
import { isValid as checkCpf } from '@fnando/cpf';

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
          is: {
            args: [/^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9])(?=.*[!@#$%&*/~]).{8,})$/g],
            msg: 'Weak password, put a stronger password',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      cpf: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'CPF already exists.',
        },
        validate: {
          checkCpf(value) {
            if (!checkCpf(value)) {
              throw new Error('CPF invalid.');
            }
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
            args: [7, 20],
            msg: 'The possition must be a SELLER or MANAGER.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async employee => {
      if (employee.password) {
        employee.password_hash = await bcryptjs.hash(employee.password, 8);
      }

      employee.fee = employee.billing_month * 0.05;
    });
    return this;
  }
}
