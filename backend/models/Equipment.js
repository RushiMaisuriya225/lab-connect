import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('Available', 'In Use', 'Under Maintenance'),
    defaultValue: 'Available'
  }
});

export default Equipment;
