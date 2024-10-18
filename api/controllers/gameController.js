import { createGameEntry, getUserGamesEntry, deleteGameEntry, updateGameEntry } from '../services/gameService.js';

export const createGame = async (req, res) => {
  const { gameId, playerStats, gameResult } = req.body;
  const userId = req.user.id;

  try {
    const game = await createGameEntry(userId, gameId, playerStats, gameResult);
    return res.status(201).json(game);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserGames = async (req, res) => {
  const userId = req.user.id;
  try {
    const games = await getUserGamesEntry(userId);
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateGame = async (req, res) => {
  const { gameId } = req.params;
  const userId = req.user.id;
  const updates = req.body;
  try {
    const updatedGame = await updateGameEntry(userId ,gameId, updates);
    return res.json(updatedGame);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteGame = async (req, res) => {
  const { gameId } = req.params;
  const userId = req.user.id;
  try {
    await deleteGameEntry(userId, gameId);
    return res.json({ message: 'Game entry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};