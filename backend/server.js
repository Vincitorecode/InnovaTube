import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

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
