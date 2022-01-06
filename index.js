const canvas = document.querySelector(".myCanvas");
const scoreElement = document.querySelector(".score");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./Imagebackground.jpeg";
const bulbasurImg = new Image();
bulbasurImg.src = "./bulbasaur.png";
const ratataImg = new Image();
ratataImg.src = "./ratata.png";
const gameoverImg = new Image();
gameoverImg.src = "./game-over.jpeg"

/*
img.onload = () => {
    ctx.drawImage (img, 0, 0, canvas.width, canvas.height)
}
*/

let score = 0;

let frames = 0;

const enemies = [];

let gameState = "game";

const bgImgAnime = {
  img: img,
  x: 0,
  y: -190,
  speed: -3,
  move: function () {
    this.x += this.speed;
    this.x %= canvas.width;
  },
  draw: function () {
    this.move();
    ctx.drawImage(this.img, this.x, this.y);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, this.y);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, this.y);
    }
  },
};

class MainPokemon {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.w = 180;
    this.h = 130;
    this.gravity = 0.5;
    this.gravitySpeed = 10;
    this.jump = false;
  }

  update() {
    if (this.jump) {
      this.gravitySpeed = -8;
    } else if (this.y < 280) {
      this.gravitySpeed += this.gravity;
    } else {
      this.y = 300;
    }
    this.y += this.gravitySpeed;
  }

  draw() {
    this.update();
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  left() {
    return this.x + 30;
  }
  right() {
    return this.x + this.w - 30;
  }
  top() {
    return this.y + 30;
  }
  bottom() {
    return this.y + this.h - 30;
  }

  collision(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }

  jumpOver(obstacle) {
    const middlepoint = (obstacle.left() + obstacle.right()) / 2;
    if (this.left() > middlepoint && obstacle.jumpOver === false) {
      score++;
      obstacle.jumpOver = true;
      scoreElement.innerHTML = score;
    }
  }
}

class EnemyPokemon {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.w = 180;
    this.h = 130;
    this.speed = -5;
    this.jumpOver = false;
  }

  update() {
    this.x += this.speed;
  }

  draw() {
    this.update();
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  left() {
    return this.x + 30 ;
  }
  right() {
    return this.x + this.w - 30;
  }
  top() {
    return this.y + 30;
  }
  bottom() {
    return this.y + this.h - 30;
  }
}

const ratata = new EnemyPokemon(600, 300, ratataImg);

const bulbasur = new MainPokemon(50, 300, bulbasurImg);

setInterval(() => {
  switch (gameState) {
    case "game":
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bgImgAnime.draw();
      /* ctx.drawImage(img, 0, 0, canvas.width, canvas.height); */
      bulbasur.draw();
      enemies.forEach((enemy) => {
        enemy.draw();
        bulbasur.collision(enemy);
        if (bulbasur.collision(enemy)) {
            gameState = "gameover"
        }
        bulbasur.jumpOver(enemy);
      });
      frames++;
      if (frames % 100 === 0) {
        enemies.push(new EnemyPokemon(600, 300, ratataImg));
      } 
      break;
    case "gameover": 
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.drawImage(gameoverImg, 0, 0)
      break;
  }
}, 20);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    bulbasur.jump = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    bulbasur.jump = false;
  }
});
