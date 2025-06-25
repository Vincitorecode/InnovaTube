import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import videoRoutes from './routes/videoRoutes.js';


dotenv.config();// <-- this line loads environment variables from a .env file into process.env
console.log('JWT_SECRET:', process.env.JWT_SECRET); // <-- test if JWT_SECRET is loaded correctly
const app = express();

// this line sets the port to the value of PORT in the .env file or defaults to 5000 if not set
app.use(express.json());

app.use('/api/videos', videoRoutes);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.use('/api/user', userRoutes);
// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Conexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err.message);
});
