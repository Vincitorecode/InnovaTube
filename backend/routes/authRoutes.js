import express from 'express';
import { registerUser, loginUser} from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
export default router;
// This code sets up an Express router for handling user registration.