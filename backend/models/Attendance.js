import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  signInTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  signOutTime: {
    type: DataTypes.DATE
  },
  labSession: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Attendance.belongsTo(User, { foreignKey: 'studentId' });

export default Attendance;
