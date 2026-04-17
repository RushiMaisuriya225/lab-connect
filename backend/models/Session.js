import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentOccupancy: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Session.belongsTo(User, { foreignKey: 'facultyId' });

export default Session;
