import express from 'express';
import { createGame, getUserGames, updateGame, deleteGame } from '../controllers/gameController.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/game', authenticateToken, createGame);
router.get('/games', authenticateToken, getUserGames);
router.put('/games/:gameId', authenticateToken, updateGame);
router.delete('/games/:gameId', authenticateToken, deleteGame); 

export default router;

/**
 * @swagger
 * /api/game:
 *   post:
 *     summary: Create a new game entry
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: string
 *               playerStats:
 *                 type: object
 *               gameResult:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Failed to create game entry
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all game entries for a user
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of game entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Failed to retrieve game data
 */

/**
 * @swagger
 * /api/games/{gameId}:
 *   put:
 *     summary: Update a game entry
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: gameId
 *         in: path
 *         required: true
 *         description: The ID of the game to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Game entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Failed to update game entry
 */

/**
 * @swagger
 * /api/games/{gameId}:
 *   delete:
 *     summary: Delete a game entry
 *     tags: [Game]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: gameId
 *         in: path
 *         required: true
 *         description: The ID of the game to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game entry deleted successfully
 *       500:
 *         description: Failed to delete game entry
 */
