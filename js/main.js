const sky = document.querySelector("main");

const balloon = sky.querySelector("div");
const scoreboard = document.querySelector("body p");
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let speed = 1;
let points = 0;
let gameOver = false;
let stopped = false;

balloon.onclick = function () {
  if (!gameOver && !stopped) {
    speed += 0.15;
    balloon.textContent = "✨";
    balloon.style.opacity = 0;
    scoreboard.textContent = `${++points} ⭐️`;
    setTimeout(reset, 500);
    stopped = true;
  }
};

function getCloud() {
  // Esto das nubes pode quitarse e queda moito máis simple
  const cloud = document.createElement("span");
  cloud.textContent = "☁️";
  const size = Math.random() * 400;
  cloud.style.fontSize = `${size}px`;
  cloud.style.top = `${Math.random() * windowHeight}px`;
  cloud.style.left = `${Math.random() * windowWidth - size / 2}px`;
  return cloud;
}

function reset() {
  balloon.textContent = "🎈";
  balloon.style.opacity = 1;
  balloon.style.fontSize = `${4 + Math.random() * 4}rem`;

  const { width } = balloon.getBoundingClientRect();

  const y = windowHeight;
  const x = Math.random() * (windowWidth - width);
  balloon.style.transform = `translate(${x}px, ${y}px)`;

  sky.append(getCloud());

  stopped = false;
  window.requestAnimationFrame(loop);
}

function loop() {
  if (!stopped) {
    const { x, y } = balloon.getBoundingClientRect();

    if (y < 0) {
      balloon.textContent = "💥";
      scoreboard.textContent = `Salvaste ${points} globos. Recarga para intentarlo de nuevo.`;
      gameOver = true;
    } else {
      balloon.style.transform = `translate(${x}px, ${y - speed}px)`;
      window.requestAnimationFrame(loop);
    }
  }
}

reset();
