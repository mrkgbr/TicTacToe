const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const cells = document.querySelectorAll(".cell");
  let currentMark = "X";
  const div = document.querySelector(".header");

  const toggleMark = () => {
    if (currentMark === "X") {
      currentMark = "O";
    } else {
      currentMark = "X";
    }
  };

  const render = () => {
    cells.forEach((cell, index) => {
      const newCell = cell;
      newCell.textContent = board[index];
      newCell.classList.remove("inactive");
    });
  };

  const checkForWinner = () => {
    const sayWinner = (winner) => {
      if (winner === "tie") {
        div.textContent = `Its a tie!`;
      } else {
        div.textContent = `The winner is: ${winner}`;
        cells.forEach((cell) => {
          const newCell = cell;
          newCell.classList.add("inactive");
        });
      }
    };

    for (let i = 0; i < board.length; i += 3) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 1] &&
        board[i] === board[i + 2]
      ) {
        sayWinner(board[i]);
        return;
      }
    }
    for (let i = 0; i < 3; i += 1) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 3] &&
        board[i] === board[i + 6]
      ) {
        sayWinner(board[i]);
        return;
      }
    }
    if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
      sayWinner(board[0]);
      return;
    }
    if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
      sayWinner(board[2]);
      return;
    }
    if (!board.includes("")) {
      sayWinner("tie");
    }
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      board[index] = currentMark;
      render();
      toggleMark();
      checkForWinner();
      cell.classList.add("inactive");
    });

    const reset = document.querySelector(".reset");
    reset.addEventListener("click", () => {
      board.forEach((item, i) => {
        currentMark = "X";
        board[i] = "";
        div.textContent = "";
      });
      render();
    });
  });

  return { render };
})();

const Player = (name, mark) => {
  const sayName = () => console.log(`my name is ${name}`);
  const sayMark = () => console.log(`my mark is ${mark}`);
  return { sayName, sayMark };
};

const playerOne = Player("Player 1", "X");
const playerTwo = Player("Player 2", "O");

gameBoard.render();
