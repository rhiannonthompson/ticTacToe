import { Board } from "./board.js";

export const AiPlayer = (() => {
  
  const difficultyLevels = {
    easy: 0.2,
    medium: 0.5,
    hard: 0.7,
    impossible: 1.0,
  }

  /**
   * Looks up the difficulty value based on the string. 
   * @param {string} difficulty One of "easy", "medium", "hard" or "impossible".
   * @returns {number} A number between 0 and 1.
   */
  function getDifficultyLevel(difficulty) {
    return difficultyLevels[difficulty];
  }
  
  /**
   * Picks the Ai move based on the difficulty.
   * @param {string} player Either "x" or "o".
   * @param {string} difficulty One of "easy", "medium", "hard" or "impossible".
   * @returns {number} The id of the board square in (0, 8).
   */
  function pickMove(player, difficulty) {
    let chanceNumber = Math.random();
    let difficultyLevel = getDifficultyLevel(difficulty);
    if (chanceNumber > difficultyLevel) {
      return pickRandomMove()
    } else {
      return pickBestMove(player);
    }
  }
  
  /**
   * Generates random whole number from 0 to specified number.
   * @param {number} max 
   * @returns {number} Random whole number in (0, max).
   */
  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Gets a random available move.
   * @returns {number} The id of the picked available board square.
   */
  function pickRandomMove() {
    let emptySquareIndices = Board.getEmptySquareIndices();
    let randomIndex = randomNumber(emptySquareIndices.length);
    return emptySquareIndices[randomIndex];
  }
  
  /**
   * Gets an optimal available move using minimax.
   * @param {string} player Either "x" or "o".
   * @returns {number} The id of the picked available board square.
   */
  function pickBestMove(player) {
    let depth = Board.getEmptySquareIndices().length;
    let isMaximizing = true;
    let bestMove = minimax(depth, isMaximizing, player);

    return bestMove.square;
  }

  /**
   * Evaluates the reward for the current board state.
   * @param {boolean} isMaximizing Is it a maximizing turn.
   * @param {string} currentPlayer Either "x" or "o".
   * @returns {object} Object with reward as the "score" key. 
   */
  function evaluateWinningScore(isMaximizing, currentPlayer) {
    let winner = Board.checkWinner();
    let tie = Board.checkTie();
    if (tie) {
      return { score: 0 };
    } else if ((winner === currentPlayer) === isMaximizing) {
      return { score: 10 };
    } else {
      return { score: -10 };
    }
  }

  /**
   * Finds the optimal move using the minimax algorithm. 
   * @param {number} depth The number of moves left.
   * @param {boolean} isMaximizing Is it a maximizing turn.
   * @param {string} currentPlayer Either "x" or "o".
   * @returns {object} Object with reward as the "score" key and the cell ID as the "square" key. 
   */
  function minimax(depth, isMaximizing, currentPlayer) {
    if (depth === 0 || Board.checkWinner() || Board.checkTie()) {
      let staticEvaluation = evaluateWinningScore(isMaximizing, currentPlayer);
      return staticEvaluation;
    }

    if (isMaximizing) {
      let maxEvaluation = {
        score: -Infinity,
        square: null,
      };
      Board.getEmptySquareIndices().forEach((square) => {
        Board.place(currentPlayer, square);
        let nextPlayer = currentPlayer === "x" ? "o" : "x";
        let evaluation = minimax(depth - 1, false, nextPlayer);
        if (evaluation.score > maxEvaluation.score) {
          maxEvaluation.score = evaluation.score;
          maxEvaluation.square = square;
        }
        Board.unplace(square);
      });
      return maxEvaluation;
    } else {
      let minEvaluation = {
        score: +Infinity,
        square: null,
      };
      Board.getEmptySquareIndices().forEach((square) => {
        Board.place(currentPlayer, square);
        let nextPlayer = currentPlayer === "x" ? "o" : "x";
        let evaluation = minimax(depth - 1, true, nextPlayer);
        if (evaluation.score < minEvaluation.score) {
          minEvaluation.score = evaluation.score;
          minEvaluation.square = square;
        }
        Board.unplace(square);
      });
      return minEvaluation;
    }
  }

  return {
    pickMove,
  };
})();
