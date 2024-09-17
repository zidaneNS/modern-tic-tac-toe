// iki niate ate digae logic ai ne

class Code {
  constructor(num) {
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.position = "000000000";
    this.pawn = 3;
    this.warrior = 3;
    this.general = 2;
    this.number = `${this.position}${this.pawn}${this.warrior}${this.general}${num}`;
  }
  move() {
    this.board[0].forEach((loc) => {
      loc = this.position.slice(0, 1);
    });
  }
}

const X = new Code(1);

const pos = "0123456783321";
const row1 = pos.slice(0, 3) + 1;

const rand = (str) => {
  if (str.length !== 13) {
    throw new Error("you input not 13 length string");
  }
  const locArray = [];
  for (let i = 0; i < 9; i++) {
    const loc = parseInt(str.slice(i, i + 1));
    locArray.push(loc);
  }
  const selectedLoc = locArray[Math.round(Math.random() * 8)];

  const amountPawn = str.slice(9, 10);
  const amountWarrior = str.slice(10, 11);
  const amountKing = str.slice(11, 12);
  console.log(selectedLoc);
};

// while (true) rand(pos);
