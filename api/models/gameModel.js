import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gameId: { type: String, required: true },
  playerStats: { type: Object, required: true },
  gameResult: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;