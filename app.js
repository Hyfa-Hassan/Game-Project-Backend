import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './api/routes/authRoutes.js';
import gameRoutes from './api/routes/gameRoutes.js';
import { connectRabbitMQ } from './config/rabbitmq.js';
import { subscribeToUserRegister } from './rabbitmq/subscriber.js';
import { mysqlConnection } from './config/db.js';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorMiddleware.js';
import setupSwagger from './swagger.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(errorHandler);

// Use routes
app.use('/auth', authRoutes);
app.use('/api', gameRoutes);

setupSwagger(app);

const startServer = async () => {
  try {
    // Check MySQL connection
    await mysqlConnection.getConnection();
    console.log('MySQL connected');

    // Check MongoDB connection
    await mongoose.connection;

    // // Connect to RabbitMQ and subscribe to events
    await connectRabbitMQ();
    subscribeToUserRegister();

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
  }
};

startServer();