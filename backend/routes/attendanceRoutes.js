import express from 'express';
import { Op } from 'sequelize';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Attendance from '../models/Attendance.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/mark', protect, async (req, res) => {
  try {
    const { labSession } = req.body;
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      where: {
        studentId: req.user.id,
        labSession,
        date: { [Op.between]: [startOfDay, endOfDay] }
      }
    });

    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked for this session today' });
    }

    const attendance = await Attendance.create({
      studentId: req.user.id,
      date: new Date(),
      signInTime: new Date(),
      labSession
    });

    res.status(201).json({ ...attendance.toJSON(), _id: attendance.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/signout/:id', protect, async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ where: { id: req.params.id, studentId: req.user.id } });
    if (!attendance) return res.status(404).json({ message: 'Attendance log not found' });

    attendance.signOutTime = new Date();
    await attendance.save();

    res.json({ ...attendance.toJSON(), _id: attendance.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', protect, authorize('Faculty', 'Admin'), async (req, res) => {
  try {
    const logs = await Attendance.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    
    // Front-end compatibility mappings
    const formatted = logs.map(log => {
      const data = log.toJSON();
      return { ...data, _id: data.id };
    });
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/my-logs', protect, async (req, res) => {
  try {
    const logs = await Attendance.findAll({ where: { studentId: req.user.id } });
    const formatted = logs.map(log => ({ ...log.toJSON(), _id: log.id }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
