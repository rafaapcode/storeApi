import Sequelize, { Model } from 'sequelize';

export default class Product extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'If you have more products with the same name, increase their quantity.',
        },
        validate: {
          len: {
            args: [5, 255],
            msg: 'Name must be at least 5 characters.',
          },
        },
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Price must be a float number.',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 255],
            msg: 'Description must be at least 10 characters',
          },
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Quantity must be an integer.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'products',
    });

    return this;
  }
}
