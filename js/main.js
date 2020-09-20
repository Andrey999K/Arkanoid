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
    this.coordinateTop = this.y - this.radius;
    this.coordinateRight = this.x + this.radius;
    this.coordinateBottom = this.y + this.radius;
    this.coordinateLeft = this.x - this.radius;
}

function enemy(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
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
    console.log(circ.y - (canvas.height - rectangle.height - circ.radius));
    if (circ.y - (canvas.height - rectangle.height - circ.radius) >= 0 &&
        circ.y - (canvas.height - rectangle.height - circ.radius) < circ.speed) {
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
    if (circ.top && circ.right) { //ВВЕРХ ВПРАВО

    } else if (circ.top && !circ.right) { //ВВЕРХ ВЛЕВО

    } else if (circ.top && circ.right) { //ВНИЗ ВПРАВО

    } else if (circ.top && circ.right) { //ВНИЗ ВЛЕВО

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

let circ = new circle(480, 600, 50, 0, 2 * Math.PI, "orange", true, false, 3);
ctx.fillStyle = circ.color;
ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
ctx.fill();

ctx.fillStyle = rectangle.color;
ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);

let enemies = [6];

for (let i = 0; i < 6; i++) {
    enemies[i] = new enemy(300 + i * 200, 500, 50, 25, "green");
    ctx.beginPath();
    ctx.fillStyle = enemies[i].color;
    ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
}

console.log(enemies);

// let timerId = setInterval(() => {
//     renderCircle();
//     hit();
//     killEnemy();
// }, 50);


//ФУНКЦИЯ ДЛЯ УДАЛЕНИЯ
const circleMove = (x, y) => {
    ctx.beginPath();
    ctx.fillStyle = "#1d0c0c";
    ctx.arc(circ.x, circ.y, circ.radius + 1, circ.start, circ.end);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = circ.color;
    circ.x = x;
    circ.y = y;
    ctx.arc(circ.x, circ.y, circ.radius, circ.start, circ.end);
    ctx.fill();
};

canvas.addEventListener("mousemove", () => {
    renderSlider(event.clientX - 80);
    circleMove(event.clientX, event.clientY);
    console.log(circ.x, circ.y);
});