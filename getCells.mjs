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

export { cells };
