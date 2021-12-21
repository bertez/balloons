const sky = document.querySelector("main");

const balloon = sky.querySelector("div");
const scoreboard = document.querySelector("body p");

//Nota: recalcular on resize
const { innerHeight, innerWidth } = window;

let speedFactor = 1;
let points = 0;
let gameOver = false;
let stopped = true;
let animation;

balloon.onclick = function () {
  if (!gameOver && !stopped) {
    speedFactor += 100;
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
  cloud.style.top = `${Math.random() * innerHeight}px`;
  cloud.style.left = `${Math.random() * innerWidth - size / 2}px`;
  return cloud;
}

function reset() {
  balloon.textContent = "🎈";
  balloon.style.opacity = 1;
  balloon.style.fontSize = `${4 + Math.random() * 4}rem`;

  const { width } = balloon.getBoundingClientRect();

  const y = innerHeight;
  const x = Math.random() * (innerWidth - width);

  sky.append(getCloud());

  balloon.getAnimations().map((a) => a.cancel());

  balloon.animate(
    [
      { transform: `translate(${x}px, ${y}px)` },
      { transform: `translate(${x}px, 0px)` },
    ],
    { duration: 5000 - speedFactor, fill: "forwards" }
  ).onfinish = endGame;

  stopped = false;
}

function endGame() {
  gameOver = true;
  balloon.textContent = "💥";
  scoreboard.textContent = `Salvaste ${points} globos. Recarga para intentarlo de nuevo.`;
}

reset();
