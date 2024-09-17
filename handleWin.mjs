import { cells } from "./getCells.mjs";

const highlightWinningCells = async (winningCells) => {
  for (let i = 0; i < winningCells.length; i++) {
    winningCells[i].style.backgroundColor = "green";
    await new Promise((resolve) => setTimeout(resolve, 300)); // Beri jeda waktu 300ms untuk efek visual
  }
};

const checkWin = (player) => {
  const winningCells = [];
  // Cek baris
  for (let i = 0; i < 3; i++) {
    if (
      cells[i][0].textContent === player &&
      cells[i][1].textContent === player &&
      cells[i][2].textContent === player
    ) {
      winningCells.push(cells[i][0], cells[i][1], cells[i][2]);
      return winningCells;
    }
  }
  // Cek kolom
  for (let i = 0; i < 3; i++) {
    if (
      cells[0][i].textContent === player &&
      cells[1][i].textContent === player &&
      cells[2][i].textContent === player
    ) {
      winningCells.push(cells[0][i], cells[1][i], cells[2][i]);
      return winningCells;
    }
  }
  // Cek diagonal
  if (
    cells[0][0].textContent === player &&
    cells[1][1].textContent === player &&
    cells[2][2].textContent === player
  ) {
    winningCells.push(cells[0][0], cells[1][1], cells[2][2]);
    return winningCells;
  }
  if (
    cells[0][2].textContent === player &&
    cells[1][1].textContent === player &&
    cells[2][0].textContent === player
  ) {
    winningCells.push(cells[0][2], cells[1][1], cells[2][0]);
    return winningCells;
  }
  return null;
};

export { highlightWinningCells, checkWin };
