// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // Import the auth routes
const path = require('path');
const app = express();

dotenv.config();
connectDB();

// app.use(cors());

// OR, if you want to be specific about which origins are allowed
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods if needed
  credentials: true, // Include this if you're dealing with cookies or sessions
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Route files
const userRoutes = require('./routes/userRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
