const sky = document.querySelector("main");

const balloon = sky.querySelector("div");
const scoreboard = document.querySelector("body p");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let speed = 1;
let points = 0;
let gameOver = false;
let stopped = true;

balloon.onclick = function () {
  if (!gameOver) {
    speed += 0.5;
    balloon.textContent = "✨";
    balloon.style.opacity = 0;
    scoreboard.textContent = `${++points} puntos`;
    setTimeout(resetBalloon, 500);
    stopped = false;
  }
};

function resetBalloon() {
  balloon.textContent = "🎈";
  balloon.style.opacity = 1;
  balloon.style.fontSize = `${4 + Math.random() * 4}rem`;

  const { width } = balloon.getBoundingClientRect();

  const y = windowHeight;
  const x = Math.random() * (windowWidth - width);

  const cloud = document.createElement("img");
  cloud.setAttribute("src", "cloud.svg");
  cloud.style.top = `${Math.random() * windowHeight}px`;
  cloud.style.left = `${Math.random() * windowWidth}px`;
  cloud.setAttribute("width", Math.random() * 500);
  sky.appendChild(cloud);

  balloon.style.transform = `translate(${x}px, ${y}px)`;
  stopped = true;
  requestAnimationFrame(loop);
}

function loop() {
  if (stopped) {
    const { x, y } = balloon.getBoundingClientRect();

    if (y < 0) {
      balloon.textContent = "💥";
      gameOver = true;
    } else {
      balloon.style.transform = `translate(${x}px, ${y - speed}px)`;
      requestAnimationFrame(loop);
    }
  }
}

resetBalloon();
