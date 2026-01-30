import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error('MONGO_URL not defined in .env');

    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default dbConnection;
