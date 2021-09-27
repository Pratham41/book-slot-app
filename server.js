const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const userRoute = require('./route/user');
const slotRoute = require('./route/slot');

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/user', userRoute);
app.use('/api/slot', slotRoute);

if (process.env.NODE_ENV !== 'production') {
  app.use('/', express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend/build/index.html'));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
