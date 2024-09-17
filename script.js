const cellCollections = Array.from(document.getElementsByClassName("cell"));
const title = document.getElementById("title");

cellCollections.forEach((cell) => {
  cell.id = 0;
});

// Mengubah array satu dimensi ke dua dimensi
const cells = [];
let ind = 0;
for (let i = 0; i < 3; i++) {
  const row = [];
  for (let j = 0; j < 3; j++) {
    const el = cellCollections[ind];
    ind++;
    row.push(el);
  }
  cells.push(row);
}

class Player {
  constructor(text) {
    this.text = text;
    this.pion = 3;
    this.knight = 3;
    this.dekan = 2;
    this.value = 1;
    this.canPion = true;
    this.canKnight = true;
    this.canDekan = true;
    this.canClick = this.canPion;
    if (this.text === "X") {
      this.color = "hitam";
    } else {
      this.color = "putih";
    }
    this.img = new Image();
    this.img.src = `/assets/pion ${this.color}.png`;
  }
  getPion() {
    if (this.pion > 0) {
      this.pion--;
      this.value = 1;
      this.img.src = `assets/pion ${this.color}.png`;
    } else {
      this.canPion = false;
    }
  }

  getKnight() {
    if (this.knight > 0) {
      this.knight--;
      this.value = 2;
      this.img.src = `assets/knight ${this.color}.png`;
    } else {
      this.canKnight = false;
    }
  }

  getDekan() {
    if (this.dekan) {
      this.dekan--;
      this.value = 3;
      this.img.src = `assets/king ${this.color}.png`;
    } else {
      this.canDekan = false;
    }
  }

  getPlayer(val) {
    switch (val) {
      case 1:
        this.getPion();
        this.canClick = this.canPion;
        break;
      case 2:
        this.getKnight();
        this.canClick = this.canKnight;
        break;
      case 3:
        this.getDekan();
        this.canClick = this.canDekan;
        break;
      default:
        break;
    }
  }
}

// Giliran O
let ORound = true;

// Mendeklarasikan player
const playerO = new Player("O");
const playerX = new Player("X");

let category = 1;

// Menentukan kategori player
window.addEventListener("keydown", (e) => {
  if (e.key == "p") {
    alert("you choose pion");
    category = 1;
  } else if (e.key == "k") {
    alert("you choose knight");
    category = 2;
  } else if (e.key == "d") {
    alert("you choose dekan");
    category = 3;
  }
});

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

// Disable all button
const disableAll = () => {
  cells.forEach((cell) =>
    cell.forEach((el) => {
      el.removeEventListener("click", handleClick);
    })
  );
};

// Logic TicTacToe
const handleClick = async (el) => {
  if (category > el.target.id) {
    if (ORound) {
      playerO.getPlayer(category);
      if (playerO.canClick) {
        let cellImg = new Image();
        cellImg.src = playerO.img.src;
        el.target.appendChild(cellImg);
        el.target.id = category;
        const winningCells = checkWin(playerO.text);
        if (winningCells) {
          await highlightWinningCells(winningCells);
          alert(`${playerO.text} Win`);
          disableAll();
        }
        ORound = false;
      } else {
        alert("Kontol");
      }
    } else {
      playerX.getPlayer(category);
      if (playerX.canClick) {
        let cellImg = new Image();
        cellImg.src = playerX.img.src;
        el.target.appendChild(cellImg);
        el.target.id = category;
        const winningCells = checkWin(playerX.text);
        if (winningCells) {
          await highlightWinningCells(winningCells);
          alert(`${playerX.text} Win`);
          disableAll();
        }
        ORound = true;
      } else {
        alert("Kontol");
      }
    }
  }
};

cells.forEach((cell) => {
  cell.forEach((el) => {
    el.addEventListener("click", handleClick);
  });
});
