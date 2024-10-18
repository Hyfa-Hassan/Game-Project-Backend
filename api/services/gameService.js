import Game from '../models/gameModel.js';

export const createGameEntry = async (userId, gameId, playerStats, gameResult) => {
  try {
    const game = new Game({ userId, gameId, playerStats, gameResult });
    await game.save();
    return game;
  } catch (error) {
    throw new Error('Failed to create game entry');
  }
};

export const getUserGamesEntry = async (userId) => {
  try {
    const games = await Game.find({ userId });
    if (!games) {
        throw new Error('Game entry not found');
    }
    return games;
  } catch (error) {
    throw new Error('Failed to retrieve game data');
  }
};

export const updateGameEntry = async (userId, gameId, updates) => {
  try {
    const updatedGame = await Game.findOneAndUpdate({ userId, gameId }, updates, { new: true });
      
    if (!updatedGame) {
        throw new Error('Game entry not found');
    }
    return updatedGame;
  } catch (error) {    
    console.log("err::::::::::::::::", error);
    throw new Error('Failed to update game enrty');
  }
};

export const deleteGameEntry = async (userId, gameId) => {
    try {
        const deletedGame = await Game.findOneAndDelete({ userId, gameId });
        if (!deletedGame) {
          throw new Error('Game entry not found');
        }
    } catch (error) {
        throw new Error('Failed to delete game entry');
    }
  };