const Player = (name) => {
  const playerName = name;
  return { playerName };
};

const players = ["", ""];

const addPlayer = document.querySelector("#add-player");
const form = document.querySelector("#player-form");
const info = document.querySelector("#info");
addPlayer.addEventListener("click", () => {
  players[0] = Player(form["player-one"].value);
  players[1] = Player(form["player-two"].value);
  let playerOne = players[0].playerName;
  let playerTwo = players[1].playerName;
  if (playerOne === "") {
    playerOne = "X";
  }
  if (playerTwo === "") {
    playerTwo = "O";
  }
  info.textContent = `Active players: ${playerOne} and ${playerTwo} `;
  console.log(players);
});

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
        if (winner === "X") {
          if (players[0] !== "" && players[0].playerName !== "") {
            div.textContent = `The winner is: ${players[0].playerName}`;
          } else {
            div.textContent = `The winner is: ${winner}`;
          }
        } else if (players[1] !== "" && players[1].playerName !== "") {
          div.textContent = `The winner is: ${players[1].playerName}`;
        } else {
          div.textContent = `The winner is: ${winner}`;
        }
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

gameBoard.render();
