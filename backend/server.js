const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { protect } = require('./middlewares/authMiddleware');

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
console.log(`Connecting to MongoDB at ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);

app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}, you are authorized.` });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});