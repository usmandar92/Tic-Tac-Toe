(function () {
  const board = document.getElementById("board");
  const cells = Array.from(document.querySelectorAll(".cell"));
  const statusEl = document.getElementById("status");
  const resetBtn = document.getElementById("resetBtn");
  const scoreXEl = document.getElementById("scoreX");
  const scoreOEl = document.getElementById("scoreO");
  const scoreDrawEl = document.getElementById("scoreDraw");

  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];

  let cellValues = Array(9).fill(null);
  let currentPlayer = "X"; // Cloudways starts
  let gameOver = false;
  let scores = { X: 0, O: 0, draw: 0 };

  function playerName(player) {
    return player === "X" ? "Cloudways" : "Hostinger";
  }

  function render() {
    cells.forEach((cell, i) => {
      const value = cellValues[i];
      cell.textContent = value === "X" ? "\u00D7" : value === "O" ? "\u25CB" : "";
      cell.classList.toggle("x", value === "X");
      cell.classList.toggle("o", value === "O");
      cell.disabled = Boolean(value) || gameOver;
      const rc = `Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}`;
      cell.setAttribute(
        "aria-label",
        value ? `${rc}, ${playerName(value)}` : `${rc}, empty`
      );
    });
  }

  function checkWinner() {
    for (const line of WIN_LINES) {
      const [a, b, c] = line;
      if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
        return { player: cellValues[a], line };
      }
    }
    return null;
  }

  function handleCellClick(e) {
    if (gameOver) return;
    const index = Number(e.currentTarget.dataset.index);
    if (cellValues[index]) return;

    cellValues[index] = currentPlayer;

    const result = checkWinner();
    if (result) {
      gameOver = true;
      result.line.forEach((i) => cells[i].classList.add("win"));
      scores[result.player] += 1;
      updateScoreboard();
      statusEl.textContent = `${playerName(result.player)} wins!`;
      statusEl.className = `status win-${result.player.toLowerCase()}`;
      render();
      return;
    }

    if (cellValues.every(Boolean)) {
      gameOver = true;
      scores.draw += 1;
      updateScoreboard();
      statusEl.textContent = "It's a draw.";
      statusEl.className = "status";
      render();
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.textContent = `${playerName(currentPlayer)}'s turn`;
    statusEl.className = "status";
    render();
  }

  function updateScoreboard() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreDrawEl.textContent = scores.draw;
  }

  function newRound() {
    cellValues = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    cells.forEach((cell) => cell.classList.remove("win"));
    statusEl.textContent = "Cloudways goes first";
    statusEl.className = "status";
    render();
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", newRound);

  render();
})();
