import { highlightWinningCells, checkWin } from "./handleWin.mjs";
import { cells } from "./getCells.mjs";

const handleClick = async (el, ORound, playerO, playerX, category) => {
  if (category > el.target.id) {
    if (ORound) {
      await getResponse(playerO, el, category);
      ORound = false;
    } else {
      await getResponse(playerX, el, category);
      ORound = true;
    }
  }
};

const disableAll = () => {
  cells.forEach((cell) =>
    cell.forEach((el) => {
      el.removeEventListener("click", handleClick);
    })
  );
};

const getResponse = async (player, el, category) => {
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

export { handleClick };
