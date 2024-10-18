import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await registerUser(username, email, password);
    return res.status(201).json(result);
  } catch (error) {
    console.log("error:::::::::::", error)
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser( email, password);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
};