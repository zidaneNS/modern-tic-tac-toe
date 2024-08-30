const cellCollections = Array.from(document.getElementsByClassName("cell"));
const title = document.getElementById("title");

cellCollections.forEach((cell) => {
  cell.id = 0;
});

// mengubah array satu dimensi ke dua dimensi
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
  }
  getPion() {
    if (this.pion > 0) {
      this.pion--;
      console.log("cok", this.pion);
      this.value = 1;
    }
  }

  getKnight() {
    if (this.knight > 0) {
      this.knight--;
      this.value = 2;
      console.log(this.knight);
    }
  }

  getDekan() {
    if (this.dekan) {
      this.dekan--;
      this.value = 3;
      console.log(this.dekan);
    }
  }

  getPlayer(val) {
    switch (val) {
      case 1:
        this.getPion();
        break;
      case 2:
        this.getKnight();
        break;
      case 3:
        this.getDekan();
        break;
      default:
        break;
    }
  }
}

// giliran O
let ORound = true;

// mendeklarasikan player
const playerO = new Player("O");
const playerX = new Player("X");

let category = 1;

// menentukan kategori player
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

const checkWin = (player) => {
  // Cek baris
  for (let i = 0; i < 3; i++) {
    if (
      cells[i][0].textContent === player &&
      cells[i][1].textContent === player &&
      cells[i][2].textContent === player
    ) {
      return true;
    }
  }
  // Cek kolom
  for (let i = 0; i < 3; i++) {
    if (
      cells[0][i].textContent === player &&
      cells[1][i].textContent === player &&
      cells[2][i].textContent === player
    ) {
      return true;
    }
  }
  // Cek diagonal
  if (
    cells[0][0].textContent === player &&
    cells[1][1].textContent === player &&
    cells[2][2].textContent === player
  ) {
    return true;
  }
  if (
    cells[0][2].textContent === player &&
    cells[1][1].textContent === player &&
    cells[2][0].textContent === player
  ) {
    return true;
  }
  return false;
};

// disable all button
const disableAll = () => {
  cells.forEach((cell) => cell.forEach((el) => (el.disabled = true)));
};

// logic tictactoe
cells.forEach((cell) => {
  cell.forEach((el) => {
    el.addEventListener("click", () => {
      if (category > el.id) {
        if (ORound) {
          el.textContent = playerO.text;
          el.id = category;
          playerO.getPlayer(category);
          if (checkWin(playerO.text)) {
            disableAll();
            title.textContent = `${playerO.text} Win`;
          }
          ORound = false;
        } else {
          el.textContent = playerX.text;
          el.id = category;
          playerX.getPlayer(category);
          if (checkWin(playerX.text)) {
            disableAll();
            title.textContent = `${playerX.text} Win`;
          }
          ORound = true;
        }
      }
    });
  });
});
