import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    // valid inputs    
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Verificar si usuario o correo ya existen
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already registered' });
    }

    // Encript password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
