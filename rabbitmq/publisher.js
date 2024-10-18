import { channel } from '../config/rabbitmq.js';

export const publishToUserRegisterQueue = async (userData) => {
  try {
    if (channel) {
      await channel.assertQueue('user_register', { durable: true });
      channel.sendToQueue(
        'user_register',
        Buffer.from(JSON.stringify(userData)),
        { persistent: true }
      );
      console.log('Message sent to queue: user_register');
    }
  } catch (error) {
    console.error('Error publishing to queue:', error);
  }
};
