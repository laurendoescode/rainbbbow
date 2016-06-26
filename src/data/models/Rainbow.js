import DataType from 'sequelize';
import Model from '../sequelize';

const Rainbow = Model.define('Rainbow', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  date: {
    type: DataType.DATEONLY,
  },

  red: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  orange: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  yellow: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  green: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  cyan: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  blue: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  purple: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

  pink: {
    type: DataType.DOUBLE,
    defaultValue: 0.0,
  },

}, {

  indexes: [
    { fields: ['date'] },
  ],

});

export default Rainbow;
