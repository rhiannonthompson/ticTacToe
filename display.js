export const Display = (() => {
  const X_CLASS = "x";
  const O_CLASS = "o";
  const cellElements = document.querySelectorAll(".cell");
  const boardElement = document.querySelector("#board");
  const resetButton = document.querySelector(".reset");
  const selectX = document.querySelector(".btn-x");
  const selectO = document.querySelector(".btn-o");
  const dropdown = document.querySelector("#difficulty-list");

  /**
   * Initializes the DOM elements and sets event listeners 
   * @param {function} handleReset Event listener for reset button.
   * @param {function} handleClick Event listener for cell selection.
   * @param {function} handleSelectX Event listener for selecting to play as x.
   * @param {function} handleSelectO Event listener for selecting to play a y.
   * @param {function} handleSelectDifficulty Event listener for difficulty dropdown.
   * @param {boolean} isAiTurn Is it Ai's turn.
   * @param {boolean} playAsX Is playing as x, needed for button display.
   */
  function initialize(
    handleReset,
    handleClick,
    handleSelectX,
    handleSelectO,
    handleSelectDifficulty,
    isAiTurn,
    playAsX
  ) {
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
      cell.classList.remove("no-click");
      cell.addEventListener("click", handleClick, {
        once: true,
      });
    });
    resetButton.addEventListener("click", handleReset);
    selectX.addEventListener("click", handleSelectX);
    selectO.addEventListener("click", handleSelectO);
    dropdown.addEventListener("click", handleSelectDifficulty);
    if (playAsX) {
      selectX.classList.add("select");
      selectO.classList.remove("select");
    } else {
      selectO.classList.add("select");
      selectX.classList.remove("select");
    }
    update(handleClick, isAiTurn, false);
  }

  /**
   * Disables event listeners and removes hover styling on board cells. 
   * @param {function} handleClick Event listener for cell selection. 
   */
  function disable(handleClick) {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(O_CLASS);
    removeBoardClickListeners(handleClick);
  }

  /**
   * Disables event listener on board cells.
   * @param {function} handleClick Event listener for cell selection.
   */
  function removeBoardClickListeners(handleClick) {
    cellElements.forEach((cell) => {
      cell.classList.add("no-click");
      cell.removeEventListener("click", handleClick);
    });
  }

  /**
   * Enables event listener on board cells.
   * @param {function} handleClick Event listener for cell selection.
   */
  function addBoardClickListeners(handleClick) {
    cellElements.forEach((cell) => {
      cell.classList.remove("no-click");
      cell.addEventListener("click", handleClick);
    });
  }

  /**
   * If it is Ai's turn disables board interactions and visa versa. 
   * @param {function} handleClick Event listener for cell selection.
   * @param {boolean} isAiTurn Is it Ai's turn.
   * @param {boolean} isOTurn Is it O's turn
   */
  function update(handleClick, isAiTurn, isOTurn) {
    if (isAiTurn) {
      boardElement.classList.remove(X_CLASS);
      boardElement.classList.remove(O_CLASS);
      removeBoardClickListeners(handleClick);
    } else {
      if (isOTurn) {
        boardElement.classList.remove(X_CLASS);
        boardElement.classList.add(O_CLASS);
      } else {
        boardElement.classList.remove(O_CLASS);
        boardElement.classList.add(X_CLASS);
      }
      addBoardClickListeners(handleClick);
    }
  }

  /**
   * Adds a mark (X or O) to the specified DOM node.
   * @param {node} cell Node for a board cell. 
   * @param {boolean} isOTurn Is it O's turn. 
   * @returns {string} X or O.
   */
  function setMark(cell, isOTurn) {
    const currentMark = isOTurn ? O_CLASS : X_CLASS;
    cell.classList.add(currentMark);
    return currentMark;
  }

  return {
    cellElements,
    initialize,
    disable,
    removeBoardClickListeners,
    addBoardClickListeners,
    update,
    setMark,
    O_CLASS,
    X_CLASS,
  };
})();
