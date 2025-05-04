import config from '.';
import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(config.DB_URL);
    console.log(
      `Database connected successfully, Mode: ${config.NODE_ENV} & PORT: ${connection.port}`,
    );
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default dbConnect;
