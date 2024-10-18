import { channel } from '../config/rabbitmq.js';
import fs from 'fs';

export const subscribeToUserRegister = async () => {
  if (channel) {
    try {
      // Ensure the queue exists before consuming messages
      await channel.assertQueue('user_register', { durable: true });
      
      channel.consume('user_register', (msg) => {
        const userData = JSON.parse(msg.content.toString());
        fs.appendFileSync('user_logs.txt', `New User Registered: ${userData.email}\n`);
        channel.ack(msg);
      });
    } catch (error) {
      console.error('Error consuming RabbitMQ messages:', error);
    }
  }
};
