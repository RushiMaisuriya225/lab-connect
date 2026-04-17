import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/reservations', reservationRoutes);

app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running normally.' });
});

// Start listening after connecting to DB
const PORT = process.env.PORT || 5000;

import sequelize from './db.js';

sequelize.sync()
  .then(() => {
    console.log('SQLite DB connected & synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('DB connection error:', error));
