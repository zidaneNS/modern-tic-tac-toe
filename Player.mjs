class Player {
  constructor(text) {
    this.text = text;
    this.pion = 3;
    this.knight = 3;
    this.king = 2;
    this.value = 1;
    this.canPion = true;
    this.canKnight = true;
    this.canKing = true;
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
      this.img.src = `/assets/pion ${this.color}.png`;
    } else {
      this.canPion = false;
    }
  }

  getKnight() {
    if (this.knight > 0) {
      this.knight--;
      this.value = 2;
      this.img.src = `/assets/knight ${this.color}.png`;
    } else {
      this.canKnight = false;
    }
  }

  getKing() {
    if (this.king) {
      this.king--;
      this.value = 3;
      this.img.src = `/assets/king ${this.color}.png`;
    } else {
      this.canKing = false;
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
        this.getKing();
        this.canClick = this.canKing;
        break;
      default:
        break;
    }
  }
}

export { Player }