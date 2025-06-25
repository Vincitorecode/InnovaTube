import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // formato: "Bearer TOKEN"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ahora req.user tendrá info del token
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
