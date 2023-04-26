const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ballImg = new Image();
ballImg.src = './images/ball.png';
ballImg.onload = () => { drawBall() }

const startBtn = document.getElementById("start");

const ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 50,
  speed: 8,
  bounces: 8,
  bounceCount: 0,
};

function drawBall() {
  ctx.drawImage(ballImg, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCollisions() {
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.speed = -ball.speed;
    ball.bounceCount++;
  }

  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.speed = -ball.speed;
    ball.bounceCount++;
  }

  if (ball.bounceCount === ball.bounces) {
    clearInterval(interval);
  }
}

function animate() {
  ball.y += ball.speed;

  handleCollisions();
  clearCanvas();
  drawBall();
}

startBtn.addEventListener("click", () => {
  clearCanvas();
  interval = setInterval(animate, 15);
});
