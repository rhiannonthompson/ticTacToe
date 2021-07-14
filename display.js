export const Display = (() => {
  const X_CLASS = "x";
  const O_CLASS = "o";
  const cellElements = document.querySelectorAll(".cell");
  const boardElement = document.querySelector("#board");
  const resetButton = document.querySelector(".resetButton");
  const selectX = document.querySelector(".btn-x");
  const selectO = document.querySelector(".btn-o");

  function initialize(
    handleReset,
    handleClick,
    handleSelectX,
    handleSelectO,
    isAiTurn,
    isOTurn,
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
    if (playAsX) {
      selectX.classList.add("select");
      selectO.classList.remove("select");
    } else {
      selectO.classList.add("select");
      selectX.classList.remove("select");
    }
    update(handleClick, isAiTurn, isOTurn);
  }

  function disable(handleClick) {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(O_CLASS);
    removeBoardClickListeners(handleClick);
  }

  function removeBoardClickListeners(handleClick) {
    cellElements.forEach((cell) => {
      cell.classList.add("no-click");
      cell.removeEventListener("click", handleClick);
    });
  }

  function addBoardClickListeners(handleClick) {
    cellElements.forEach((cell) => {
      cell.classList.remove("no-click");
      cell.addEventListener("click", handleClick);
    });
  }

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
