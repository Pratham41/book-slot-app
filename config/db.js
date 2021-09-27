const mongoose = require('mongoose');

// DB CONNECTION
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('MongoDB connected !');
  } catch (error) {
    console.log('Failed to connect to MongoDB');
    process.exit(1);
  }
};

module.exports = connectDB;
