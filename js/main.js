// const input = document.querySelector(".color");

// input.addEventListener("input", () => {
//     document.querySelector("body").style.background = input.value;
//     console.log(input.value);
// });

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const score = document.querySelector(".score");
let score_ = 0;
canvas.width = innerWidth;
canvas.height = innerHeight;
// ctx.fillStyle = "yellow";
// ctx.fillRect(innerWidth / 2 - 80, innerHeight - 20, 160, 20);

class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

class Circle {
  constructor(x, y, radius, start, end, color, top, right, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.color = color;
    this.top = top;
    this.right = right;
    this.speed = speed;
    this.coordinateTop = this.y - this.radius;
    this.coordinateRight = this.x + this.radius;
    this.coordinateBottom = this.y + this.radius;
    this.coordinateLeft = this.x - this.radius;
  }
}

class Enemy {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
  }
}

const renderSlider = (x) => {
  ctx.fillStyle = rectangle.color;
  ctx.clearRect(rectangle.x + 300, canvas.height - 110, 150, 110);
  rectangle.x = x;
  ctx.clearRect(0, canvas.height - 20, canvas.width, 20);
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  ctx.drawImage(image2, rectangle.x + 300, innerHeight - 110, 150, 200);
  // ctx.beginPath();
  // ctx.moveTo(rectangle.x + 360, canvas.height);
  // ctx.lineTo(rectangle.x + 335, canvas.height - 50);
  // ctx.lineTo(rectangle.x + 310, canvas.height);
  // ctx.lineTo(rectangle.x + 290, canvas.height - 75);
  // ctx.lineTo(rectangle.x + 335, canvas.height - 100);
  // ctx.lineTo(rectangle.x + 380, canvas.height - 75);
  // ctx.fill();
  // ctx.closePath();
};

const renderCircle = () => {
  for (let i = 0; i < circ.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "#1d0c0c";
    ctx.arc(
      circ[i].x,
      circ[i].y,
      circ[i].radius + 1,
      circ[i].start,
      circ[i].end
    );
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();

    ctx.fillStyle = circ[i].color;

    if (circ[i].y <= circ[i].radius) {
      circ[i].top = false;
    }

    if (circ[i].x <= circ[i].radius) {
      circ[i].right = true;
    }

    if (circ[i].x >= canvas.width - circ[i].radius) {
      circ[i].right = false;
    }

    if (
      canvas.height - circ[i].y - circ[i].radius >= 0 &&
      canvas.height - circ[i].y - circ[i].radius < circ[i].speed
    ) {
      circ[i].top = true;
    }

    if (circ[i].top) {
      circ[i].y -= circ[i].speed;
    } else {
      circ[i].y += circ[i].speed;
    }

    if (circ[i].right) {
      circ[i].x += circ[i].speed;
    } else {
      circ[i].x -= circ[i].speed;
    }

    // ctx.arc(circ[i].x, circ[i].y, circ[i].radius, circ[i].start, circ[i].end);
    // ctx.fill();
    ctx.drawImage(
      image1[i],
      circ[i].x - circ[i].radius,
      circ[i].y - circ[i].radius,
      circ[i].radius * 2,
      circ[i].radius * 2
    );
  }
};

const hit = () => {
  //   console.log(circ.y + circ.radius, rectangle.x, rectangle.x + rectangle.width);
  for (let i = 0; i < circ.length; i++) {
    if (
      circ[i].y - (canvas.height - rectangle.height - circ[i].radius) >= 0 &&
      circ[i].y - (canvas.height - rectangle.height - circ[i].radius) <
        circ[i].speed
    ) {
      if (
        circ[i].x >= rectangle.x &&
        circ[i].x <= rectangle.x + rectangle.width
      )
        circ[i].top = true;
      else {
        gameOver();
      }
    }
    if (circ[i].y > rectangle.y) gameOver();
  }
};

const deleteEnemies = (i) => {
  ctx.clearRect(
    enemies[i].x,
    enemies[i].y,
    enemies[i].width,
    enemies[i].height
  );

  enemies.splice(i, 1);
  //   console.log(enemies[i]);
  //   enemies[i].x = 0;
  //   enemies[i].y = 0;
  //   enemies[i].x2 = 0;
  //   enemies[i].y2 = 0;
  //   enemies[i].width = 0;
  //   enemies[i].height = 0;

  score_ += 10;
  score.textContent = `Score: ${score_}`;
};

const killEnemy = () => {
  for (let i = 0; i < circ.length; i++) {
    if (circ[i].top && circ[i].right) {
      //ВВЕРХ ВПРАВО
      for (let j = 0; j < enemies.length; j++) {
        if (
          // УДАР ДУГОЙ
          Math.pow(enemies[j].x - circ[i].x, 2) +
            Math.pow(enemies[j].y2 - circ[i].y, 2) <=
          Math.pow(circ[i].radius, 2)
        ) {
          if (
            //УДАР ВЕРХНЕЙ ПРАВОЙ ДУГОЙ
            circ[i].y - circ[i].radius <= enemies[j].y2 &&
            circ[i].x + circ[i].radius >= enemies[j].x
          ) {
            deleteEnemies(j);
            circ[i].top = false;
            circ[i].right = false;
          } else if (
            circ[i].y - circ[i].radius <= enemies[j].y2 &&
            circ[i].x - circ[i].radius <= enemies[j].x2
          ) {
            //УДАР ВЕРХНЕЙ ЛЕВОЙ ДУГОЙ
            deleteEnemies(j);
            circ[i].top = false;
          } else if (
            circ[i].x + circ[i].radius >= enemies[j].x &&
            circ[i].y + circ[i].radius >= enemies[j].y
          ) {
            deleteEnemies(j);
            circ[i].right = false;
          }
        }
        if (
          //УДАР СНИЗУ
          enemies[j].y2 - circ[i].y + circ[i].radius >= 0 &&
          enemies[j].y2 - circ[i].y + circ[i].radius < circ[i].speed &&
          circ[i].x >= enemies[j].x &&
          circ[i].x <= enemies[j].x2
        ) {
          deleteEnemies(j);
          circ[i].top = false;
        }
        if (
          //УДАР СЛЕВА
          circ[i].x + circ[i].radius - enemies[j].x >= 0 &&
          circ[i].x + circ[i].radius - enemies[j].x < circ[i].speed &&
          circ[i].y >= enemies[j].y &&
          circ[i].y <= enemies[j].y2
        ) {
          deleteEnemies(j);
          circ[i].right = false;
        }
      }
    } else if (circ[i].top && !circ[i].right) {
      //ВВЕРХ ВЛЕВО
      for (let j = 0; j < enemies.length; j++) {
        if (
          //УДАР ЛЕВОЙ ВЕРХНЕЙ ДУГОЙ
          Math.pow(enemies[j].x2 - circ[i].x, 2) +
            Math.pow(enemies[j].y2 - circ[i].y, 2) <=
          Math.pow(circ[i].radius, 2)
        ) {
          if (
            circ[i].y - circ[i].radius <= enemies[j].y2 &&
            circ[i].x - circ[i].radius <= enemies[j].x2
          ) {
            deleteEnemies(j);
            circ[i].top = false;
            circ[i].right = true;
          }
        }
        if (
          //УДАР СНИЗУ
          enemies[j].y2 - circ[i].y + circ[i].radius >= 0 &&
          enemies[j].y2 - circ[i].y + circ[i].radius < circ[i].speed &&
          circ[i].x >= enemies[j].x &&
          circ[i].x <= enemies[j].x2
        ) {
          deleteEnemies(j);
          circ[i].top = false;
        }
        if (
          //УДАР СПРАВА
          enemies[j].x2 - circ[i].x + circ[i].radius >= 0 &&
          enemies[j].x2 - circ[i].x + circ[i].radius < circ[i].speed &&
          circ[i].y >= enemies[j].y &&
          circ[i].y <= enemies[j].y2
        ) {
          deleteEnemies(j);
          circ[i].right = true;
        }
      }
    } else if (!circ[i].top && circ[i].right) {
      //ВНИЗ ВПРАВО
      for (let j = 0; j < enemies.length; j++) {
        if (
          //УДАР НИЖНЕЙ ПРАВОЙ ДУГОЙ
          Math.pow(enemies[j].x - circ[i].x, 2) +
            Math.pow(enemies[j].y - circ[i].y, 2) <=
          Math.pow(circ[i].radius, 2)
        ) {
          if (
            circ[i].y + circ[i].radius <= enemies[j].y &&
            circ[i].x + circ[i].radius >= enemies[j].x
          ) {
            deleteEnemies(j);
            circ[i].top = true;
            circ[i].right = false;
          }
        }

        if (
          //УДАР СЛЕВА
          circ[i].x + circ[i].radius - enemies[j].x >= 0 &&
          circ[i].x + circ[i].radius - enemies[j].x < circ[i].radius &&
          circ[i].y >= enemies[j].y &&
          circ[i].y <= enemies[j].y2
        ) {
          deleteEnemies(j);
          circ[i].right = false;
        }

        if (
          //УДАР СВЕРХУ
          circ[i].y + circ[i].radius - enemies[j].y >= 0 &&
          circ[i].y + circ[i].radius - enemies[j].y < circ[i].radius &&
          circ[i].x >= enemies[j].x &&
          circ[i].x <= enemies[j].x2
        ) {
          deleteEnemies(j);
          circ[i].top = true;
        }
      }
    } else if (!circ[i].top && !circ[i].right) {
      //ВНИЗ ВЛЕВО
      for (let j = 0; j < enemies.length; j++) {
        if (
          //УДАР НИЖНЕЙ ЛЕВОЙ ДУГОЙ
          Math.pow(enemies[j].x2 - circ[i].x, 2) +
            Math.pow(enemies[j].y - circ[i].y, 2) <=
          Math.pow(circ[i].radius, 2)
        ) {
          if (
            circ[i].y + circ[i].radius <= enemies[j].y &&
            circ[i].x - circ[i].radius >= enemies[j].x2
          ) {
            deleteEnemies(j);
            circ[i].top = true;
            circ[i].right = false;
          }
        }
        if (
          //УДАР СВЕРХУ
          circ[i].y + circ[i].radius - enemies[j].y >= 0 &&
          circ[i].y + circ[i].radius - enemies[j].y < circ[i].radius &&
          circ[i].x >= enemies[j].x &&
          circ[i].x <= enemies[j].x2
        ) {
          deleteEnemies(j);
          circ[i].top = true;
        }
        if (
          //УДАР СПРАВА
          enemies[j].x2 - circ[i].x + circ[i].radius >= 0 &&
          enemies[j].x2 - circ[i].x + circ[i].radius < circ[i].speed &&
          circ[i].y >= enemies[j].y &&
          circ[i].y <= enemies[j].y2
        ) {
          deleteEnemies(j);
          circ[i].right = true;
        }
      }
    }
  }
};

const gameOver = () => {
  let gameOver = document.createElement("h1");
  gameOver.className = "gameOver";
  gameOver.textContent = "Game Over";
  document.querySelector("body").replaceChild(gameOver, canvas);
  clearInterval(timerId);
  clearInterval(timerId1);
};

let rectangle = new Rect(
  innerWidth / 2 - 150,
  innerHeight - 20,
  300,
  20,
  "red"
);

let image2 = new Image();
image2.src = "img/0.png";
image2.addEventListener("load", () => {
  ctx.drawImage(image2, innerWidth / 2 + 150, innerHeight - 110, 150, 200);
});

let circ = [];
circ.length = 3;
for (let i = 0; i < circ.length; i++) {
  circ[i] = new Circle(
    160 + i * 100,
    400 + i * 100,
    50,
    0,
    2 * Math.PI,
    "orange",
    true,
    true,
    1
  );
  // ctx.beginPath();
  // ctx.fillStyle = circ[i].color;
  // ctx.arc(circ[i].x, circ[i].y, circ[i].radius, circ[i].start, circ[i].end);
  // ctx.fill();
}

// let circ = new Circle(460, 600, 50, 0, 2 * Math.PI, "orange", true, false, 1);

timerId1 = setInterval(() => {
  for (let i = 0; i < circ.length; i++) {
    // if (circ[i].speed != 10) circ[i].speed++;
    if (circ[i].radius - 5 > 0) {
      ctx.beginPath();
      ctx.fillStyle = "#1d0c0c";
      ctx.arc(
        circ[i].x,
        circ[i].y,
        circ[i].radius + 1,
        circ[i].start,
        circ[i].end
      );
      ctx.fill();
      ctx.closePath();
      circ[i].radius -= 2;
    }
  }
  // if (rectangle.width >= 30) rectangle.width -= 20;
}, 1000);
let image1 = [];
image1.length = 3;
for (let i = 0; i < image1.length; i++) {
  image1[i] = new Image();
  image1[i].src = `img/${i + 1}.png`;
}

image1.forEach((item, i) => {
  item.addEventListener("load", () => {
    ctx.drawImage(
      item,
      circ[i].x - circ[i].radius,
      circ[i].y - circ[i].radius,
      circ[i].radius * 2,
      circ[i].radius * 2
    );
  });
});

ctx.fillStyle = rectangle.color;
ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

// ctx.beginPath();
// ctx.moveTo(canvas.width / 2 + 210, canvas.height);
// ctx.lineTo(canvas.width / 2 + 185, canvas.height - 50);
// ctx.lineTo(canvas.width / 2 + 160, canvas.height);
// ctx.lineTo(canvas.width / 2 + 140, canvas.height - 75);
// ctx.lineTo(canvas.width / 2 + 185, canvas.height - 100);
// ctx.lineTo(canvas.width / 2 + 230, canvas.height - 75);
// ctx.fill();
// ctx.closePath();

let enemies = [];
enemies.length = 20;

for (let i = 0; i < enemies.length; i++) {
  enemies[i] = new Enemy(
    100 + i * 50,
    Math.floor(Math.random() * (400 - 0)) + 0,
    50,
    25,
    "green"
  );
  ctx.beginPath();
  ctx.fillStyle = enemies[i].color;
  ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
}

let timerId = setInterval(() => {
  renderCircle();
  hit();
  killEnemy();
}, 1);

//ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ
// const circleMove = (x, y) => {
//     ctx.beginPath();
//     ctx.fillStyle = "#1d0c0c";
//     ctx.arc(circ.x, circ.y, circ.radius + 1, circ.start, circ.end);
//     ctx.fill();
//     ctx.closePath();
//     ctx.beginPath();
//     ctx.fillStyle = circ.color;
//     circ.x = x;
//     circ.y = y;
//     ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
//     ctx.fill();
// };

canvas.addEventListener("mousemove", () => {
  renderSlider(event.clientX - 150);
  // circleMove(event.clientX, event.clientY);
});
