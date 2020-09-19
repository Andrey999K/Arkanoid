// const input = document.querySelector(".color");

// input.addEventListener("input", () => {
//     document.querySelector("body").style.background = input.value;
//     console.log(input.value);
// });

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
// ctx.fillStyle = "yellow";
// ctx.fillRect(innerWidth / 2 - 80, innerHeight - 20, 160, 20);

function rect(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

function circle(x, y, radius, start, end, color, top, right, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.start = start;
  this.end = end;
  this.color = color;
  this.top = top;
  this.right = right;
  this.speed = speed;
}

function enemy(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

const renderSlider = (x) => {
  ctx.fillStyle = rectangle.color;
  rectangle.x = x;
  ctx.clearRect(0, canvas.height - 20, canvas.width, 20);
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
};

const renderCircle = () => {
  ctx.beginPath();
  ctx.fillStyle = "#1d0c0c";
  ctx.arc(circ.x, circ.y, circ.radius + 1, circ.start, circ.end);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();

  ctx.fillStyle = circ.color;

  if (circ.y <= circ.radius) {
    circ.top = false;
  }

  if (circ.x <= circ.radius) {
    circ.right = true;
  }

  if (circ.x >= canvas.width - circ.radius) {
    circ.right = false;
  }

  if (circ.top) {
    circ.y -= circ.speed;
  } else {
    circ.y += circ.speed;
  }

  if (circ.right) {
    circ.x += circ.speed;
  } else {
    circ.x -= circ.speed;
  }

  ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
  ctx.fill();
};

const hit = () => {
  //   console.log(circ.y + circ.radius, rectangle.x, rectangle.x + rectangle.width);
  if (circ.y == canvas.height - rectangle.height - circ.radius) {
    if (circ.x >= rectangle.x && circ.x <= rectangle.x + rectangle.width)
      circ.top = true;
    else {
      gameOver();
    }
  }
  if (circ.y > rectangle.y) gameOver();
};

const deleteEnemies = (i) => {
  ctx.clearRect(
    enemies[i].x,
    enemies[i].y,
    enemies[i].width,
    enemies[i].height
  );
  enemies[i].x = 0;
  enemies[i].y = 0;
  enemies[i].width = 0;
  enemies[i].height = 0;
};

const killEnemy = () => {
  for (let i = 0; i < enemies.length; i++) {
    // if (
    //   circ.x + circ.radius - enemies[i].x >= 0 &&
    //   circ.x + circ.radius - enemies[i].x <= circ.speed &&
    //   circ.y + circ.radius - enemies[i].y >= 0 &&
    //   circ.y + circ.radius - enemies[i].y <= circ.speed
    // ) {
    //   deleteEnemies(i);
    //   circ.right = false;
    // }
    // if (
    //   enemies[i].x + enemies[i].width - (circ.x - circ.radius) >= 0 &&
    //   enemies[i].x + enemies[i].width - (circ.x - circ.radius) <= circ.speed &&
    //   circ.y + circ.radius - enemies[i].y >= 0 &&
    //   circ.y + circ.radius - enemies[i].y <= circ.speed
    // ) {
    //   deleteEnemies(i);
    //   circ.right = true;
    // }
    // if (
    // )
    if (circ.top && circ.right) {
      //летит вверх вправо
      if (
        enemies[i].y + enemies[i].height - (circ.y - circ.radius) >= 0 &&
        enemies[i].y + enemies[i].height - (circ.y - circ.radius) <
          circ.speed &&
        circ.x >= enemies[i].x &&
        circ.x <= enemies[i].x + enemies[i].width
      ) {
        deleteEnemies(i);
        circ.top = false;
      }

      if (
        circ.x + circ.radius - enemies[i].x >= 0 &&
        circ.x + circ.radius - enemies[i].x < circ.radius &&
        circ.y >= enemies[i].y &&
        circ.y <= enemies[i].y + enemies[i].height
      ) {
        deleteEnemies(i);
        circ.right = false;
      }

      if (
        enemies[i].x >= circ.x &&
        enemies[i].y + enemies[i].height <= circ.y &&
        Math.pow(enemies[i].x - circ.x) +
          Math.pow(enemies[i].y + enemies[i].height - circ.y) <=
          Math.pow(circ.radius)
      ) {
        deleteEnemies(i);
        circ.right = false;
        circ.top = false;
      }
    } else if (!circ.top && circ.right) {
      //летит вниз вправо
    } else if (circ.top && !circ.right) {
      console.log(circ.y, enemies[i].y);
      //летит вверх влево
      console.log(circ.x);
      if (
        enemies[i].y + enemies[i].height - (circ.y - circ.radius) >= 0 &&
        enemies[i].y + enemies[i].height - (circ.y - circ.radius) <
          circ.speed &&
        circ.x >= enemies[i].x &&
        circ.x <= enemies[i].x + enemies[i].width
      ) {
        deleteEnemies(i);
        circ.top = false;
      }

      if (
        enemies[i].x + enemies[i].width <= circ.x &&
        enemies[i].y + enemies[i].height <= circ.y &&
        Math.pow(enemies[i].x + enemies[i].width - circ.x) +
          Math.pow(enemies[i].y + enemies[i].height - circ.y) <=
          Math.pow(circ.radius)
      ) {
        deleteEnemies(i);
        circ.right = false;
        circ.top = false;
      }
    } else if (!circ.top && !circ.right) {
      //летит вниз влево
    }
  }
};

const gameOver = () => {
  let gameOver = document.createElement("h1");
  gameOver.className = "gameOver";
  gameOver.textContent = "Game Over";
  document.querySelector("body").replaceChild(gameOver, canvas);
  clearInterval(timerId);
};

let rectangle = new rect(innerWidth / 2 - 80, innerHeight - 20, 160, 20, "red");

let circ = new circle(1000, 600, 50, 0, 2 * Math.PI, "orange", true, false, 3);
ctx.fillStyle = circ.color;
ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
ctx.fill();

ctx.fillStyle = rectangle.color;
ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

let enemies = [6];

for (let i = 0; i < 6; i++) {
  enemies[i] = new enemy(500 + i * 100, 500, 50, 25, "green");
  ctx.beginPath();
  ctx.fillStyle = enemies[i].color;
  ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
}

console.log(enemies);

let timerId = setInterval(() => {
  renderCircle();
  hit();
  killEnemy();
}, 1000);

canvas.addEventListener("mousemove", () => {
  renderSlider(event.clientX - 80);
});
