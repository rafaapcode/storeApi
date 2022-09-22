import Sequelize, { Model } from 'sequelize';
import validator from 'cpf-cnpj-validator';
import joi from 'joi';
import bcrypt from 'bcryptjs';

export default class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [5, 255],
            msg: 'Name must be between 5 and 255 characters',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
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
            args: [/^(?=.*[a-z])(?=.*[A-Z](?=.*[0-9])(?=.*[!@#$%&*?/~]).{8,})$/g],
            msg: 'Your password is weak, try again.',
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
        validate: {
          customValidator(value) {
            const cpfFormat = value.replace(/\D+/g, '');
            const Joi = joi.extend(validator);
            const cpfValidation = Joi.document().cpf();
            if (!cpfValidation.validate(cpfFormat)) {
              throw new Error('CPF invalid');
            }
          },
        },
      },
      faturamentomes: {
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
        validate: {
          len: {
            args: [6, 255],
            msg: 'The position must be manager or seller',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      user.comissao = user.faturamentomes * 0.05;
    });

    return this;
  }
}
