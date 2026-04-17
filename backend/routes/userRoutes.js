import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', protect, authorize('Admin'), async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    
    // Map users to mimic _id for frontend compatibility
    const formatted = users.map(u => ({ ...u.toJSON(), _id: u.id }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id/role', protect, authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (user) {
      res.json({ ...user.toJSON(), _id: user.id });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
