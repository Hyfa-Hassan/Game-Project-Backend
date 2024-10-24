import jwt from 'jsonwebtoken';
import { mysqlConnection } from '../config/db.js';

const authenticateToken = async(req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await mysqlConnection.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    // console.log("token:::::::::::::",rows[0]);
    const user = rows[0];
    // Check if the token matches the current session token
    if (!user || user.currentSessionToken !== token) {
      return res.status(401).json({ error: 'Session invalid. Please log in again.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export { authenticateToken };
