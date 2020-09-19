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

function circle(x, y, radius, start, end, color, top, right) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.start = start;
  this.end = end;
  this.color = color;
  this.top = top;
  this.right = right;
}

const renderSlider = (x) => {
  ctx.fillStyle = rectangle.color;
  rectangle.x = x;
  ctx.clearRect(0, canvas.height - 20, canvas.width, 20);
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
};

const renderCircle = () => {
  ctx.clearRect(circ.x - 50, circ.y - 50, circ.radius * 2, circ.radius * 2);
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
    circ.y -= 3;
  } else {
    circ.y += 3;
  }

  if (circ.right) {
    circ.x += 3;
  } else {
    circ.x -= 3;
  }

  ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
  ctx.stroke();
  ctx.fill();
};

const hit = () => {
  console.log(circ.y + circ.radius, rectangle.x, rectangle.x + rectangle.width);
  if (circ.y == canvas.height - rectangle.height - circ.radius) {
    if (circ.x >= rectangle.x && circ.x <= rectangle.x + rectangle.width)
      circ.top = true;
    else {
      gameOver();
    }
  }
  if (circ.y > rectangle.y) gameOver();
};

const gameOver = () => {
  let gameOver = document.createElement("h1");
  gameOver.className = "gameOver";
  gameOver.textContent = "Game Over";
  document.querySelector("body").replaceChild(gameOver, canvas);
  clearInterval(timerId);
};

let rectangle = new rect(innerWidth / 2 - 80, innerHeight - 20, 160, 20, "red");

let circ = new circle(50, 200, 50, 0, 2 * Math.PI, "orange", false, true);

ctx.fillStyle = circ.color;
ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
ctx.stroke();
ctx.fill();

ctx.fillStyle = rectangle.color;
ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

let timerId = setInterval(() => {
  renderCircle();
  hit();
}, 10);

canvas.addEventListener("mousemove", () => {
  renderSlider(event.clientX - 80);
});
