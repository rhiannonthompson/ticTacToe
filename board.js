export const Board = (function () {
  let squares = Array(9).fill(null);
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function getEmptySquareIndices() {
    let emptySquares = squares.reduce((square, element, index) => ((element === null) && square.push(index), square), []);
    return emptySquares;
  }

  function checkWinner() {
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const [a, b, c] = WINNING_COMBOS[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function checkTie() {
    return squares.every(square => square !== null) && checkWinner() === null;
  }

  function place(player, squareId) {
    if (squares[squareId] !== null) {
      return;
    }
    squares[squareId] = player;
    // render();
  }

  function unplace(squareId) {
    squares[squareId] = null;
  }

  function reset() {
    squares.fill(null);
  }

  function render() {
    console.log(squares[0], squares[1], squares[2]);
    console.log(squares[3], squares[4], squares[5]);
    console.log(squares[6], squares[7], squares[8]);
  }

  return {
    checkWinner,
    checkTie,
    place,
    reset,
    render,
    getEmptySquareIndices,
    unplace,
  }
})();




