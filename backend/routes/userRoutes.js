import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.email}`, userId: req.user.userId });
});

export default router;
