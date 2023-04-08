const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
  cells: document.querySelectorAll(".cell"),
  render() {
    this.cells.forEach((cell, index) => {
      const newCell = cell;
      newCell.textContent = gameBoard.board[index];
    });
  },
};

// const render = (() => {
//   const cells = document.querySelectorAll(".cell");

//   const board = () => {
//     cells.forEach((cell, index) => {
//       const newCell = cell;
//       newCell.textContent = gameBoard.board[index];
//     });
//   };
//   board();
//   return { board };
// })();

let currentMark = "X";

const toggleMark = () => {
  if (currentMark === "X") {
    currentMark = "O";
  } else {
    currentMark = "X";
  }
};

gameBoard.cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    gameBoard.board[index] = currentMark;
    gameBoard.render();
    toggleMark();
    cell.replaceWith(cell.cloneNode(true));
  });
});

const Player = (name, mark) => {
  const sayName = () => console.log(`my name is ${name}`);
  const sayMark = () => console.log(`my mark is ${mark}`);
  return { sayName, sayMark };
};

gameBoard.render();

const playerOne = Player("Player 1", "X");
const playerTwo = Player("Player 2", "O");

playerOne.sayName();
playerOne.sayMark();
playerTwo.sayName();
playerTwo.sayMark();
