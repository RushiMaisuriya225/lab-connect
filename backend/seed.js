import bcrypt from 'bcrypt';
import sequelize from './db.js';
import User from './models/User.js';
import Equipment from './models/Equipment.js';

const seedDB = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('SQLite DB synced and wiped');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const users = [
      { name: 'Admin User', email: 'admin@college.edu', password, role: 'Admin' },
      { name: 'Dr. Faculty', email: 'faculty@college.edu', password, role: 'Faculty' },
      { name: 'Lab Asst John', email: 'assistant@college.edu', password, role: 'LabAssistant' },
      { name: 'Student Dan', email: 'student@college.edu', password, role: 'Student' }
    ];

    await User.bulkCreate(users);
    console.log('Users seeded');

    const equipment = [
      { name: 'Oscilloscope X1', category: 'Electronics', serialNumber: 'OSC-001', status: 'Available' },
      { name: 'Microscope Pro', category: 'Biology', serialNumber: 'MIC-002', status: 'In Use' },
      { name: '3D Printer Maker', category: 'Engineering', serialNumber: '3DP-003', status: 'Under Maintenance' },
      { name: 'Arduino Uno Kit', category: 'Electronics', serialNumber: 'ARD-004', status: 'Available' }
    ];

    await Equipment.bulkCreate(equipment);
    console.log('Equipment seeded');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
