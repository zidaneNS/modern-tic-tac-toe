// -------------------------
// Imports
// -------------------------
import { Player } from "./Player.mjs";

// -------------------------
// Constants and Variables
// -------------------------
const cellCollections = Array.from(document.getElementsByClassName("cell"));
const title = document.getElementById("title");

let isORound = true;  // Indicator for the current player's turn
let category = 1;     // Default category for pieces

// Initialize players
const playerO = new Player("O"); // Human Player
const playerX = new Player("X"); // AI Player

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
      el.dataset.player = ''; // Initialize player to an empty string
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
  const clickedCell = event.currentTarget; 
  const currentPlayer = playerO; 

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
    
    // After the player's turn, let the AI take its turn
    if (currentPlayer.canClick) { 
      await aiMove(); // Make AI move
    }
  } else {
    alert("Invalid Move! King > Knight > Peon");
    return;
  }
};

// Handle AI move
const aiMove = async () => {
  const validMoves = [];
  console.log("AI is calculating its move...");

  // Loop through each category the AI can use
  for (let aiCategory = 1; aiCategory <= 3; aiCategory++) {
    // Check if AI has sufficient pieces of that category
    let hasSufficientPieces = false;
    if (aiCategory === 1 && playerX.pion > 0) {
      hasSufficientPieces = true;
    } else if (aiCategory === 2 && playerX.knight > 0) {
      hasSufficientPieces = true;
    } else if (aiCategory === 3 && playerX.king > 0) {
      hasSufficientPieces = true;
    }

    // Only check the board if AI has sufficient pieces
    if (hasSufficientPieces) {
      ////console.log(`AI has sufficient pieces for category ${aiCategory}`);

      // Collect valid moves for the current category
      for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
          const cell = cells[i][j];
          ////console.log(`AI considers placing category ${aiCategory} in cell (${i}, ${j})`);

          // Debugging logs to understand cell properties
          ////console.log(`Cell (${i}, ${j}) - category: ${cell.dataset.category}, player: ${cell.dataset.player}`);

          // Check if the move is valid
          const cellCategory = Number(cell.dataset.category);
          const cellPlayer = cell.dataset.player;
          const isEmptyCell = cellPlayer === '';
          const isOpponentPiece = cellPlayer === playerO.text;

          ////console.log(`Checking conditions: cellCategory < aiCategory: ${cellCategory < aiCategory}, isEmptyCell: ${isEmptyCell}, isOpponentPiece: ${isOpponentPiece}`);

          if (
            aiCategory > cellCategory && // Ensure AI's category is higher than cell's category
            (isEmptyCell || isOpponentPiece) // Can replace opponent's piece
          )
           {
            validMoves.push({ cell, category: aiCategory });
            ////console.log(`Valid move found: category ${aiCategory} in cell (${i}, ${j})`);
          } else {
            ////console.log(`Invalid move: category ${aiCategory} in cell (${i}, ${j})`);
          }
        }
      }
    } else {
      ////console.log(`AI does not have sufficient pieces for category ${aiCategory}`);
    }
  }

  ////console.log(`Total valid moves: ${validMoves.length}`);

  if (validMoves.length > 0) {
    // Select a random valid move
    const move = validMoves[Math.floor(Math.random() * validMoves.length)];
    ////console.log(`AI selects move: category ${move.category} in cell ${move.cell.dataset.category}`);
    await processPlayerMove(playerX, move.cell, move.category); // Process AI move
  } else {
    console.warn("No valid moves left for AI.");
    alert("No valid moves left for AI.");
  }
};

const processPlayerMove = async (player, cell, pieceCategory) => {

    // Check if player can place this piece
    if (pieceCategory === 1 && !player.canPion) {
      alert("No Peons left to place.");
      return;
    }
    if (pieceCategory === 2 && !player.canKnight) {
      alert("No Knights left to place.");
      return;
    }
    if (pieceCategory === 3 && !player.canKing) {
      alert("No Kings left to place.");
      return;
    }

  player.getPlayer(pieceCategory);

  if (player.canClick) {
    // Assigning Logic
    cell.dataset.player = player.text; 
    cell.dataset.category = pieceCategory; 

    cell.innerHTML = ''; // Reset the image
    const cellImage = new Image();
    cellImage.src = player.img.src;
    cell.appendChild(cellImage);

    const winningCells = checkWin(player.text);
    if (winningCells) {
      await highlightWinningCells(winningCells);
      alert(`${player.text} wins!`); // Corrected string interpolation
      disableAllCells();
      gameEnded = true; // Stop AI take over the world
    }
  } else {
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
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "1":
      alert("You chose pion");
      category = 1;
      break;
    case "2":
      alert("You chose knight");
      category = 2;
      break;
    case "3":
      alert("You chose king");
      category = 3;
      break;
  }
});

// Initialize cell click events
cells.forEach((cellRow) =>
  cellRow.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  })
);

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", resetGame);