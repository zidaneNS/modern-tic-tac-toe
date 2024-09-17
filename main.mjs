import { handleClick } from "./handleClick.mjs";
import { Player } from "./Player.mjs";
import { cells } from "./getCells.mjs";

const main = () => {
  // menentukan giliran
  let ORound = true;

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

  cells.forEach((cell) => {
    cell.forEach((el) => {
      el.addEventListener("click", handleClick(el, ORound, playerO, playerX));
    });
  });
};

export { main };
