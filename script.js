const cellCollections = Array.from(document.getElementsByClassName("cell"));
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

let ORound = true;

function checkWin(player) {
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
}

cells.forEach((cell) => {
  cell.forEach((el) => {
    el.addEventListener("click", () => {
      if (!el.textContent) {
        if (ORound) {
          el.textContent = "O";
          if (checkWin("O")) {
            console.log("O WINS!");
          }
          ORound = false;
        } else {
          el.textContent = "X";
          if (checkWin("X")) {
            console.log("X WINS!");
          }
          ORound = true;
        }
      }
    });
  });
});
