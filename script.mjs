import { Player } from "./Player.mjs";

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
    alert("you choose king");
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

const handleClick = async (el) => {
  if (category > el.target.id) {
    if (ORound) {
      await getResponse(playerO, el);
      ORound = false;
    } else {
      await getResponse(playerX, el);
      ORound = true;
    }
  }
};

const getResponse = async (player, el) => {
  player.getPlayer(category);
  if (player.canClick) {
    const cellImg = new Image();
    cellImg.src = player.img.src;
    el.target.appendChild(cellImg);
    el.target.id = category;
    const winningCells = checkWin(player.text);
    if (winningCells) {
      await highlightWinningCells(winningCells);
      alert(`${player.text} Win`);
      disableAll();
    }
  } else {
    alert("bidak habis");
  }
};

cells.forEach((cell) => {
  cell.forEach((el) => {
    el.addEventListener("click", handleClick);
  });
});

const restart = document.getElementById('restartButton');

restart.addEventListener('click', () => {
   cells.forEach((cellRow) => {
    cellRow.forEach((cell) => {
      cell.textContent = ''; // Hapus isi teks (X/O)
      cell.id = 0; // Atur kembali ID ke nilai awal
      cell.style.backgroundColor = ''; // Hapus warna latar belakang jika ada
      cell.innerHTML = ''; // Hapus elemen gambar yang ada
    });
  });

  // Reset variabel permainan
  ORound = true; // Setel giliran kembali ke pemain O
  category = 1; // Setel kategori bidak ke nilai awal

  // Reset objek player
  playerO.pion = 3;
  playerO.knight = 3;
  playerO.king = 2;
  playerO.canPion = true;
  playerO.canKnight = true;
  playerO.canKing = true;

  playerX.pion = 3;
  playerX.knight = 3;
  playerX.king = 2;
  playerX.canPion = true;
  playerX.canKnight = true;
  playerX.canKing = true;

  // Aktifkan kembali klik pada sel
  cells.forEach((cellRow) => {
    cellRow.forEach((cell) => {
      cell.addEventListener("click", handleClick);
    });
  });
})