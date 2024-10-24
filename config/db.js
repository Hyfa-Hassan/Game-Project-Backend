import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Reconnect delay in milliseconds
const RECONNECT_DELAY = 5000;

// MySQL Connection with reconnection logic
export let mysqlConnection;

const connectMySQL = async () => {
  try {
    mysqlConnection = await mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    console.log('MySQL connected');
    mysqlConnection.on('error', async (err) => {
      console.error('MySQL error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
        console.log('Reconnecting to MySQL...');
        await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY));
        await connectMySQL();
      }
    });
  } catch (error) {
    console.error('MySQL connection error:', error);
    setTimeout(connectMySQL, RECONNECT_DELAY); // Retry connection after delay
  }
};

// MongoDB Connection with reconnection logic
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    setTimeout(connectMongoDB, RECONNECT_DELAY); // Retry connection after delay
  }

  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected, attempting to reconnect...');
    setTimeout(connectMongoDB, RECONNECT_DELAY);
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
    mongoose.disconnect();
  });
};

export { connectMySQL, connectMongoDB };
