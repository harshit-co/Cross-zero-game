document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const gameGrid = document.getElementById("game-grid");
  const cells = document.querySelectorAll(".cell");
  const popup = document.getElementById("popup");
  const winnerText = document.getElementById("winner-text");
  const restartBtn = document.getElementById("restart-btn");

  let currentPlayer = "X";
  let board = Array(9).fill(null);

  // Winning Combinations
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Start Game
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    gameGrid.classList.remove("hidden");
  });

  // Handle Cell Click
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (board[index] || popup.classList.contains("hidden") === false) return;

      // Update Board
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      // Check Win
      if (checkWin(currentPlayer)) {
        winnerText.textContent = `${currentPlayer} Wins!`;
        popup.classList.remove("hidden");
        return;
      }

      // Check Draw
      if (board.every((cell) => cell)) {
        winnerText.textContent = "It's a Draw!";
        popup.classList.remove("hidden");
        return;
      }

      // Switch Player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });

  // Restart Game
  restartBtn.addEventListener("click", () => {
    board.fill(null);
    currentPlayer = "X";
    cells.forEach((cell) => (cell.textContent = ""));
    popup.classList.add("hidden");
  });

  // Check Win Function
  function checkWin(player) {
    return winningCombos.some((combo) =>
      combo.every((index) => board[index] === player)
    );
  }
});