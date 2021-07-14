import { Board } from "./board.js";
import { Display } from "./display.js";
import { AiPlayer } from "./aiPlayer.js";

export const Game = (() => {

  let difficulty = "easy";
  let isOTurn = false;
  let isAiTurn = false;
  let playAsX = true;

  /**
   * Resets all DOM elements and the board state for a new game.
   */
  function startGame() {
    isOTurn = false;
    isAiTurn = !playAsX;
    Board.reset();
    Display.initialize(
      startGame,
      handlePlayerMoveClick,
      handleSelectX,
      handleSelectO,
      handleSelectDifficulty,
      isAiTurn,
      playAsX,
    );
    if (isAiTurn) {
      aiMove();
    }
  }

  /**
   * Defines the event handler for setting the game's difficulty.
   * @param {event} e DOM event. 
   */
  function handleSelectDifficulty(e) {
    difficulty = e.target.value;
    startGame();
  }

  /**
   * Defines the event handler for selecting to play as X.
   */
  function handleSelectX() {
    playAsX = true;
    startGame();
  }

  /**
   * Defines the event handler for selecting to play as O.
   */
  function handleSelectO() {
    playAsX = false;
    startGame();
  }

  /**
   * Defines the event handler for selecting the player's move.
   * @param {event} e DOM event.
   */
  function handlePlayerMoveClick(e) {
    const cell = e.target;
    const squareId = e.target.id;
    updateGame(cell, squareId);
  }

  /**
   * Switches turn from X to O or vise versa, and triggers Ai's turn.
   */
  function changePlayer() {
    isOTurn = !isOTurn;
    isAiTurn = !isAiTurn;
    Display.update(handlePlayerMoveClick, isAiTurn, isOTurn);
    if (isAiTurn) {
      aiMove();
    }
  }

  /**
   * Sets a promise to resolve an action after a set number of milliseconds.
   * @param {number} ms Time in milliseconds.
   * @returns {promise} Instruction to resolve after a specified time. 
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Sets the turn("x" or "o") and picks the move for the Ai. 
   * @returns The id of the picked available board square.
   */
  async function aiPick() {
    await sleep(500);
    let player = isOTurn ? Display.O_CLASS : Display.X_CLASS;
    let play = AiPlayer.pickMove(player, difficulty);
    return play;
  }

  /**
   * Resolves the Ai's move for updating the game state.
   */
  function aiMove() {
    aiPick().then((play) => {
      updateGame(Display.cellElements[play], play);
    });
  }

  /**
   * Controls flow of gameplay, updating DOM and Board state based on player and Ai actions.
   * @param {node} cell Node for a board cell. 
   * @param {number} squareId The id of the board square in (0, 8).
   */
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
      // changeDisplay();
      alert(`It's a tie`);
    } else {
      changePlayer();
      Display.update(handlePlayerMoveClick, isAiTurn, isOTurn);
    }
  }

  return {
    startGame,
  };
})();
