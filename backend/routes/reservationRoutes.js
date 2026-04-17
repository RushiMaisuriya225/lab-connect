import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Reservation from '../models/Reservation.js';
import Equipment from '../models/Equipment.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { equipmentId, startTime, endTime } = req.body;

    const equipment = await Equipment.findByPk(equipmentId);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
    if (equipment.status !== 'Available') return res.status(400).json({ message: 'Equipment is currently unavailable' });

    const reservation = await Reservation.create({
      studentId: req.user.id,
      equipmentId,
      startTime,
      endTime
    });

    res.status(201).json({ ...reservation.toJSON(), _id: reservation.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/my-reservations', protect, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({ 
      where: { studentId: req.user.id },
      include: [Equipment]
    });
    const formatted = reservations.map(r => ({ ...r.toJSON(), _id: r.id }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', protect, authorize('LabAssistant', 'Admin'), async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        Equipment,
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    const formatted = reservations.map(r => ({ ...r.toJSON(), _id: r.id }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/status', protect, authorize('LabAssistant', 'Admin'), async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

    reservation.status = req.body.status || reservation.status;
    const updated = await reservation.save();

    const eq = await Equipment.findByPk(reservation.equipmentId);
    if (eq) {
      if (updated.status === 'Approved') eq.status = 'In Use';
      if (updated.status === 'Completed' || updated.status === 'Cancelled') eq.status = 'Available';
      await eq.save();
    }

    res.json({ ...updated.toJSON(), _id: updated.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
