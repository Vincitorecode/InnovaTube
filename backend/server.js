// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config(); // Cargar variables de entorno

const allowedOrigins = [
  'http://localhost:3000', // frontend local (ajusta el puerto si usas otro)
  'https://innovatube-frontend.vercel.app' // frontend en producción
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (como curl o Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El CORS no está permitido para el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(express.json()); // Leer JSON en las peticiones
app.use(morgan('dev')); // Logging de peticiones

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/videos', videoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err.message);
});
