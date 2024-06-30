import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
// import config from './config';

// Import routes
import authRoutes from './routes/api/auth.js';
import itemRoutes from './routes/api/items.js';
import userRoutes from './routes/api/users.js';

const app = express();

app.use(cors());

// Logger Middleware
app.use(morgan('dev'));

// Bodyparser Middleware
app.use(bodyParser.json());

// Database Configuration


// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));


mongoose.connect('mongodb://127.0.0.1:27017/ShoppinList', {
  // useNewUrlParser and useUnifiedTopology are removed as they are deprecated
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default app;
