import Sequelize, { Model } from 'sequelize';
import urlConfig from '../config/url.js';

export default class Photo extends Model {
  static init(sequelize) {
    super.init({
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      originalname: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${urlConfig.url}${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
  }
}
