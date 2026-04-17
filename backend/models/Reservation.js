import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';
import Equipment from './Equipment.js';

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  }
});

Reservation.belongsTo(User, { foreignKey: 'studentId' });
Reservation.belongsTo(Equipment, { foreignKey: 'equipmentId' });

export default Reservation;
