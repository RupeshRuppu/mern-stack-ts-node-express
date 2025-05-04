import dotenv from 'dotenv';

type Config = {
  PORT: number;
  DB_URL: string;
  NODE_ENV: string;
};

dotenv.config();

const config: Config = {
  PORT: parseInt(process.env.PORT || '8000', 10),
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/ecommerce',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

export default config;
