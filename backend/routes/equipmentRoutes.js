import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import Equipment from '../models/Equipment.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    const formatted = equipment.map(e => ({ ...e.toJSON(), _id: e.id }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', protect, authorize('LabAssistant', 'Admin'), async (req, res) => {
  try {
    const { name, category, serialNumber, status } = req.body;
    
    const exists = await Equipment.findOne({ where: { serialNumber } });
    if (exists) return res.status(400).json({ message: 'Equipment with this serial number already exists' });

    const equipment = await Equipment.create({
      name, category, serialNumber, status
    });
    
    res.status(201).json({ ...equipment.toJSON(), _id: equipment.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', protect, authorize('LabAssistant', 'Admin'), async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    equipment.name = req.body.name || equipment.name;
    equipment.category = req.body.category || equipment.category;
    equipment.status = req.body.status || equipment.status;

    const updated = await equipment.save();
    res.json({ ...updated.toJSON(), _id: updated.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
