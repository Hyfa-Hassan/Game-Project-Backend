import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

// Reconnect delay in milliseconds
const RECONNECT_DELAY = 5000;

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    // Handle connection close
    connection.on('close', () => {
      console.error('RabbitMQ connection closed, attempting to reconnect...');
      setTimeout(connectRabbitMQ, RECONNECT_DELAY);
    });

    connection.on('error', (err) => {
      console.error('RabbitMQ error:', err);
    });
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    setTimeout(connectRabbitMQ, RECONNECT_DELAY);
  }
};

export { channel, connectRabbitMQ };

