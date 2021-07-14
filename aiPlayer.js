import { Board } from "./board.js";

export const AiPlayer = (() => {
  
  function pickMove(player, difficulty) {
    return pickBestMove(player);
  }
  
  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function pickRandomMove() {
    let emptySquareIndices = Board.getEmptySquareIndices();
    let randomIndex = randomNumber(emptySquareIndices.length);
    return emptySquareIndices[randomIndex];
  }
  
  function pickBestMove(player) {
    let depth = Board.getEmptySquareIndices().length;
    let isMaximizing = true;
    let bestMove = minimax(depth, isMaximizing, player);

    return bestMove.square;
  }

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
