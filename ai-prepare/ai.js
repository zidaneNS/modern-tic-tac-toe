// iki niate ate digae logic ai ne
// Bacot kon 

export class AIPlayer {
  constructor(playerText) {
    this.playerText = playerText;
  }

  // Choose a random empty cell
  makeMove(cells) {
    const emptyCells = [];

    // Collect all empty cells
    cells.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        if (!cell.dataset.player) {
          emptyCells.push(cell);
        }
      });
    });

    // If there are empty cells, select one randomly
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      return emptyCells[randomIndex];
    }
    return null; // No valid moves left
  }
}
