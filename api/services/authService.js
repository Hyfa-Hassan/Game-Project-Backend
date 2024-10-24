import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mysqlConnection } from '../../config/db.js';
import { publishToUserRegisterQueue } from '../../rabbitmq/publisher.js';

export const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [rows] = await mysqlConnection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword]
    );
    
    const token = jwt.sign({ id: rows.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await publishToUserRegisterQueue({ username, email });

    return { token };
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const loginUser = async (email, password ) => {
  try{
    const [rows] = await mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    user.currentSessionToken = token;
    await mysqlConnection.query('UPDATE users SET currentSessionToken = ? WHERE email = ?', [token, email]);    
    return {user, token};
  }catch(error){
    throw new Error('Login failed');
  }
}
