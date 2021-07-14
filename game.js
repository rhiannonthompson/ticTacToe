import { Board } from "./board.js";
import { Display } from "./display.js";
import { AiPlayer } from "./aiPlayer.js";

export const Game = (() => {
  let isOTurn = false;
  let isAiTurn = false;
  let playAsX = true;

  function startGame() {
    isOTurn = false;
    isAiTurn = !playAsX;
    Board.reset();
    Display.initialize(
      startGame,
      handlePlayerMoveClick,
      handleSelectX,
      handleSelectO,
      isAiTurn,
      isOTurn,
      playAsX,
    );
    if (isAiTurn) {
      aiMove();
    }
  }


  function handleSelectX(e) {
    playAsX = true;
    startGame();
  }

  function handleSelectO(e) {
    playAsX = false;
    startGame();
  }

  function changePlayer() {
    isOTurn = !isOTurn;
    isAiTurn = !isAiTurn;
    Display.update(handlePlayerMoveClick, isAiTurn, isOTurn);
    if (isAiTurn) {
      aiMove();
    }
  }

  function updateGame(cell, squareId) {
    let currentMark = Display.setMark(cell, isOTurn);
    Board.place(currentMark, squareId);
    let winner = Board.checkWinner();
    let tie = Board.checkTie();
    if (winner) {
      // changeDisplay();
      alert(`${winner} is the winner`);
      Display.disable();
    } else if (tie) {
      // change display
      alert(`It's a tie`);
    } else {
      changePlayer();
      Display.update(handlePlayerMoveClick, isAiTurn, isOTurn);
    }
  }

  function handlePlayerMoveClick(e) {
    const cell = e.target;
    const squareId = e.target.id;
    updateGame(cell, squareId);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function aiPick() {
    await sleep(500);
    let player = isOTurn ? Display.O_CLASS : Display.X_CLASS;
    let play = AiPlayer.pickMove(player);
    return play;
  }

  function aiMove() {
    aiPick().then((play) => {
      updateGame(Display.cellElements[play], play);
    });
  }

  return {
    startGame,
  };
})();
