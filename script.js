// -------------------------
// Imports
// -------------------------
const Player = require('./Player');

// -------------------------
// Constants and Variables
// -------------------------
const cellCollections = Array.from(document.getElementsByClassName("cell"));
const title = document.getElementById("title");
const buttonKing = document.getElementById("king");
const buttonKnight = document.getElementById("knight");
const buttonPion = document.getElementById("pion");

let isORound = true;  // Indicator for the current player's turn
let category = 1;     // Default category for pieces

// Initialize players
const playerO = new Player("O");
const playerX = new Player("X");

// Create a 2D array for cells
const cells = createCellGrid(cellCollections);

// -------------------------
// Functions
// -------------------------

// Create a 2D grid from cell collections
function createCellGrid(collections) {
  const grid = [];
  let index = 0;

  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      const el = collections[index++];
      row.push(el);
      el.dataset.category = 0;  // 0 = Empty, 1 = Peon, 2 = Knight, 3 = King
    }
    grid.push(row);
  }
  return grid;
}

// Highlight winning cells with a delay
const highlightWinningCells = async (winningCells) => {
  for (const cell of winningCells) {
    cell.style.backgroundColor = "green";
    await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for visual effect
  }
};

// Check for a win condition
const checkWin = (playerText) => {
  const winningCells = [];

  // Check rows for win
  for (let i = 0; i < 3; i++) {
    if (
      cells[i][0].dataset.player === playerText &&
      cells[i][1].dataset.player === playerText &&
      cells[i][2].dataset.player === playerText
    ) {
      winningCells.push(cells[i][0], cells[i][1], cells[i][2]);
      return winningCells;
    }
  }

  // Check columns for win
  for (let i = 0; i < 3; i++) {
    if (
      cells[0][i].dataset.player === playerText &&
      cells[1][i].dataset.player === playerText &&
      cells[2][i].dataset.player === playerText
    ) {
      winningCells.push(cells[0][i], cells[1][i], cells[2][i]);
      return winningCells;
    }
  }

  // Check diagonals for win
  if (
    cells[0][0].dataset.player === playerText &&
    cells[1][1].dataset.player === playerText &&
    cells[2][2].dataset.player === playerText
  ) {
    winningCells.push(cells[0][0], cells[1][1], cells[2][2]);
    return winningCells;
  }

  if (
    cells[0][2].dataset.player === playerText &&
    cells[1][1].dataset.player === playerText &&
    cells[2][0].dataset.player === playerText
  ) {
    winningCells.push(cells[0][2], cells[1][1], cells[2][0]);
    return winningCells;
  }
  return; // No winning condition found
};

// Disable all cell click events
const disableAllCells = () => {
  cells.forEach((cellRow) =>
    cellRow.forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
    })
  );
};

// Handle cell click events
const handleCellClick = async (event) => {
  const clickedCell = event.currentTarget; // 2 Hour to debug this... Use currentTarget instead Target
  const currentPlayer = isORound ? playerO : playerX;

  // Debug logs to check the state before processing
  console.log("Current Player:", currentPlayer.text);
  console.log("Current Player's Piece:", category);
  console.log("Clicked Cell:", clickedCell);
  console.log("Clicked Cell's Category:", clickedCell.dataset.category);
  console.log("Clicked Cell's Player:", clickedCell.dataset.player);

  // Check if the clicked cell already contains the player's piece
  if (clickedCell.dataset.player === currentPlayer.text) {
    alert("Invalid Move! Can't replace your own piece");
    return;
  }

  if (category > clickedCell.dataset.category) {
    await processPlayerMove(currentPlayer, clickedCell);

    // Debug Logs
    console.log("Clicked Cell's Category After:", clickedCell.dataset.category);
    console.log("Clicked Cell's Player After:", clickedCell.dataset.player);

    // Only toggle the turn if the player successfully placed a piece
    if (currentPlayer.canClick) {
      isORound = !isORound; // Toggle turn only if the player placed a piece
    }
  } 
  
  else {
    alert("Invalid Move! King > Knight > Peon");
    return;
  }
};


const processPlayerMove = async (player, cell) => {
  player.getPlayer(category);
  if (player.canClick) {
    // Assigning Logic
    cell.dataset.player = player.text; 
    cell.dataset.category = category; 

    // Debug log
    //console.log("Updated Cell:", cell);
    //console.log("Cell's Player:", cell.dataset.player);
    //console.log("Cell's Category:", cell.dataset.category);
   
    cell.innerHTML = ''; // Reset the image you idiota!
    const cellImage = new Image();
    cellImage.src = player.img.src;
    cell.appendChild(cellImage);

    const winningCells = checkWin(player.text);
    if (winningCells) {
      await highlightWinningCells(winningCells);
      alert(`${player.text === 'O' ? 'White' : 'Black'} wins!`);
      disableAllCells();
      resetGame(player.text);
    }

  } 
  else {
    alert("No pieces left to place. Choose another category!");
    return;
  }
};

// Reset the game state
const resetGame = () => {
  cells.forEach((cellRow) =>
    cellRow.forEach((cell) => {
      cell.dataset.player = ''; // Clear the data attribute
      cell.dataset.category = 0; // Reset data-category
      cell.style.backgroundColor = ''; // Remove background color
      cell.innerHTML = ''; // Clear image elements
    })
  );

  // Reset game variables
  isORound = true; // Reset turn to player O
  category = 1; // Reset piece category

  // Reset player states
  resetPlayerState(playerO);
  resetPlayerState(playerX);

  // Re-enable cell click events
  cells.forEach((cellRow) =>
    cellRow.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    })
  );
};

// Reset a player's state
function resetPlayerState(player) {
  player.pion = 3;
  player.knight = 3;
  player.king = 2;
  player.canPion = true;
  player.canKnight = true;
  player.canKing = true;
}

// -------------------------
// Main Script
// -------------------------

// Handle player category selection via keyboard

buttonKing.addEventListener("click", (e) => {
  alert("You chose king");
  category = 3;
});

buttonKnight.addEventListener("click", (e) => {
  alert("You chose knight");
  category = 2;
});

buttonPion.addEventListener("click", (e) => {
  alert("You chose pion");
  category = 1;
});

// Initialize cell click events
cells.forEach((cellRow) =>
  cellRow.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  })
);

// Set up restart button functionality
const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", resetGame);
