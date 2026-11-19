import { data, createGrid, removeActive } from "/init.js";

const gridContainer = document.getElementById("grid");
const ROW_LENGTH = data[0].length;
let currentIndex = 0;
let gameOver = false;
let timer = null;

createGrid(gridContainer);
const cells = document.querySelectorAll(".cell");
cells[currentIndex].classList.add("player");

class Enemy {
  constructor(index) {
    this.index = index;
  }

  remove() {
    for (let i = 0; i < cells.length; i++) {
      // cells[i].classList.remove("enemy");
      if (
        cells[i].firstChild &&
        !cells[i].firstChild.classList.contains("bomb") &&
        i !== this.index
      ) {
        cells[i].firstChild.remove();
      }
    }
  }

  draw() {
    this.remove();
    const img = document.createElement("IMG");
    img.src = "./enemy.png";
    img.classList.add("enemy");
    img.width = 40;
    img.height = 40;
    // cells[this.index].classList.add("enemy");
    if (cells[this.index]) cells[this.index].append(img);
  }

  update() {
    console.log(this.index);
    if (this.index > currentIndex) {
      if (
        (this.index - ROW_LENGTH > currentIndex &&
          cells[this.index - ROW_LENGTH] &&
          !cells[this.index - ROW_LENGTH].classList.contains("block")) ||
        (cells[this.index - ROW_LENGTH] &&
          cells[this.index - ROW_LENGTH].classList.contains("player"))
      ) {
        console.log("FIRST");
        this.index -= ROW_LENGTH;
      } else if (
        (this.index - ROW_LENGTH > currentIndex &&
          cells[this.index - 1] &&
          !cells[this.index - 1].classList.contains("block")) ||
        this.index - currentIndex < ROW_LENGTH / 2
      ) {
        console.log("SECOND");

        this.index -= 1;
      } else if (
        this.index - ROW_LENGTH < currentIndex &&
        this.index - ROW_LENGTH >= 0
      ) {
        console.log("THIRD");
        this.index -= ROW_LENGTH;
      } else if (this.index <= ROW_LENGTH) {
        console.log("FORTH");
        this.index -= 1;
      }
    } else if (this.index < currentIndex) {
      if (
        (cells[this.index + ROW_LENGTH] &&
          this.index + ROW_LENGTH < currentIndex &&
          !cells[this.index + ROW_LENGTH].classList.contains("block")) ||
        cells[this.index + ROW_LENGTH].classList.contains("player")
      ) {
        console.log("++ FIRST");
        this.index += ROW_LENGTH;
      } else if (
        (this.index + ROW_LENGTH < currentIndex &&
          cells[this.index + 1] &&
          !cells[this.index + 1].classList.contains("block")) ||
        currentIndex - this.index < ROW_LENGTH / 2
      ) {
        console.log("++ SECOND");
        this.index += 1;
      } else if (this.index + ROW_LENGTH > currentIndex) {
        console.log("++ THIRD");
        this.index += ROW_LENGTH;
      } else if (this.index >= cells.length - ROW_LENGTH) {
        console.log("++ FOURTH");
        this.index += 1;
      }
    }
  }
}

const enemy = new Enemy(cells.length - 1);

enemy.draw();

console.log(cells);

function getIndex() {
  // removeActive(cells, "enemy");
  // console.log(enemyIndex);
  enemy.draw();
  enemy.update();
}

function putTheBomb(index) {
  const bomb = document.createElement("DIV");
  const image = document.createElement("IMG");
  bomb.classList.add("bomb");
  image.src = "./bomb.png";
  bomb.append(image);
  cells[index].append(bomb);
}

// getIndex();

timer = setInterval(getIndex, 200);

const playerMove = (event) => {
  console.log(event.key);
  removeActive(cells, "player");
  switch (event.key) {
    case "ArrowUp":
      currentIndex -= ROW_LENGTH;
      break;
    case "ArrowRight":
      currentIndex += 1;
      break;
    case "ArrowDown":
      currentIndex += ROW_LENGTH;
      break;
    case "ArrowLeft":
      currentIndex -= 1;
      break;
    case " ":
      putTheBomb(currentIndex);
  }
  console.log(currentIndex);
  cells[currentIndex].classList.add("player");
};

document.addEventListener("keydown", playerMove);

if (gameOver) {
  document.removeEventListener("keydown", playerMove);
  clearInterval(timer);
}
