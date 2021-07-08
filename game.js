import { Board } from "./board.js";

export const Game = (() => {

  let oTurn = false;
  const X_CLASS = "x";
  const O_CLASS = "o";
  const cellElements = document.querySelectorAll(".cell");
  const boardElement = document.querySelector("#board");
  const resetButton = document.querySelector(".resetButton");

  function startGame() {
    oTurn = false;
    Board.reset();
    initializeDisplay();
  }

  function initializeDisplay() {
    cellElements.forEach(cell => {
      cell.classList.remove("no-click");
      cell.addEventListener("click", handleClick, {
        once: true
      })
    });
    resetButton.addEventListener("click", handleReset);
    changeHoverDisplay(oTurn);
  }

  function disableDisplay() {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(O_CLASS);
    cellElements.forEach(cell => {
      cell.classList.add("no-click")
      cell.removeEventListener("click", handleClick);
    });
  }

  function changePlayer() {
    oTurn = !oTurn;
    if (oTurn) {
      setTimeout(aiPlayer, 5000);
    }
  }

  function markDisplay(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function changeHoverDisplay() {
    if (oTurn) {
      boardElement.classList.remove(X_CLASS);
      boardElement.classList.add(O_CLASS);
    } else {
      boardElement.classList.remove(O_CLASS);
      boardElement.classList.add(X_CLASS);
    }
  };

  function resetDisplay() {
    cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
    });
    startGame();
  }

  function updateGame(cell, squareId) {
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    Board.place(currentClass, squareId);
    markDisplay(cell, currentClass);
    let winner = Board.checkWinner();
    let tie = Board.checkTie();
    if (winner) {
      // changeDisplay();
      alert(`${winner} is the winner`)
      disableDisplay();
    } else if (tie) {
      // change display
      alert(`It's a tie`)
    } else {
      changePlayer();
      changeHoverDisplay(oTurn);
    }
  }

  function handleClick(e) {
    const cell = e.target;
    const squareId = e.target.id;
    console.log(squareId);
    updateGame(cell, squareId)
  }

  function handleReset(e) {
    e.preventDefault();
    resetDisplay();
  }

  function randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  function aiPlayer() {
    let emptySquareIndices = Board.getEmptySquareIndices();
    let randomIndex = randomNumber(emptySquareIndices.length);
    let play = emptySquareIndices[randomIndex];
    updateGame(cellElements[play], play);
  }

  return {
    startGame,
  }
})();







