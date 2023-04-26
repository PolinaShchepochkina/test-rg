const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: 60,
  radius: 60,
  speed: 20,
  bounces: 12,
  bounceCount: 0,
  image: new Image(),
};

ball.image.src = './images/ball.png';
ball.image.onload = drawBall;

function drawBall() {
  ctx.drawImage(ball.image, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCollisions() {
  // верх
  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.speed = -ball.speed;
    ball.bounceCount++;
  }
  // низ
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.speed = -ball.speed;
    ball.bounceCount++;
  }

  if (ball.bounceCount === ball.bounces) {
    clearInterval(interval); // остановить анимацию и предотвратить ее продолжение после достижения заданного количества отскоков
    startBtn.disabled = false;
  }
  // Вычисление силы сопротивления воздуха и изменение скорости шарика
  const resistanceForce = 0.035 * ball.speed * ball.speed; // F(сопротивление) = k * V*V
  const acceleration = (ball.speed >= 0 ? -1 : 1) * resistanceForce / ball.radius;
  ball.speed += acceleration;
}

function animateBall() {
  handleCollisions();
  clearCanvas();
  drawBall();

  ball.speed += 0.8; // увеличение скорости мяча, для имитации гравитации
  ball.y += ball.speed; // обновление позиции
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = 60;
  ball.speed = 20;
  ball.bounceCount = 0;
}

const startBtn = document.getElementById("start");
let interval;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  clearCanvas();
  resetBall();
  interval = setInterval(animateBall, 15);
});
