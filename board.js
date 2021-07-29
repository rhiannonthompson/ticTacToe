export const Board = (function () {
  let squares = Array(9).fill(null);
  let winningCombo = null;
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /**
   * Get the empty square indices.
   * @returns An array of board indices.
   */
  function getEmptySquareIndices() {
    let emptySquares = squares.reduce(
      (square, element, index) => (
        element === null && square.push(index), square
      ),
      []
    );
    return emptySquares;
  }

  /**
   * Checks if there is a winning combination on the board.
   * @returns Either 'x', 'o' or null if there is not a winning combination.
   */
  function checkWinner() {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const [a, b, c] = WINNING_COMBOS[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winningCombo = [a, b, c];
        return squares[a];
      }
    }
    return null;
  }

  /**
   * Gets the winning combination.
   * @returns {array} Id of winning squares.
   */
  function getWinningCombo() {
    return winningCombo;
  }

  /**
   * Checks if the board is full, with no winners.
   * @returns True if tie, false otherwise.
   */
  function checkTie() {
    return squares.every((square) => square !== null) && checkWinner() === null;
  }

  /**
   * Attempts to place the player marker at square. No effect if already taken.
   * @param {String} player Either 'x' or 'o'
   * @param {Number} squareId Index of the board square (0-8). 
   */
  function place(player, squareId) {
    if (squares[squareId] !== null) {
      return;
    }
    squares[squareId] = player;
  }

  /**
   * Removes the marker at the square.
   * @param {Number} squareId Index of the board square (0-8). 
   */
  function unplace(squareId) {
    squares[squareId] = null;
  }

  /**
   * Resets the board (i.e. removes all player markers).
   */
  function reset() {
    squares.fill(null);
  }

  return {
    checkWinner,
    checkTie,
    place,
    reset,
    getEmptySquareIndices,
    unplace,
    getWinningCombo
  };
})();
