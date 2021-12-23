const sky = document.querySelector("main");

const balloon = sky.querySelector("div");
const scoreboard = document.querySelector("body p");

//Nota: recalcular on resize
const { innerHeight, innerWidth } = window;

const FLYING_ITEM = "🎄";

let speedFactor = 0;
let points = 0;

balloon.onclick = function () {
  if (balloon.textContent === FLYING_ITEM) {
    pause();
    balloon.textContent = "✨";
    balloon.style.opacity = 0;

    scoreboard.textContent = `${++points} ✨`;

    speedFactor += 100;
    setTimeout(run, 500);
  }
};

// Lanza el globo desde la base
function run() {
  addCloud();
  cancel();

  balloon.textContent = FLYING_ITEM;
  balloon.style.opacity = 1;
  balloon.style.fontSize = `${4 + Math.random() * 4}rem`;

  const { width } = balloon.getBoundingClientRect();

  const y = innerHeight;
  const x = Math.random() * (innerWidth - width);

  balloon.animate(
    [
      { transform: `translate(${x}px, ${y}px)` },
      { transform: `translate(${x}px, 0px)` },
    ],
    { duration: 5000 - speedFactor, fill: "both" }
  ).onfinish = endGame;
}

// Cancela la anterior animación
function cancel() {
  balloon.getAnimations().map((a) => a.cancel());
}

// Pausa el globo
function pause() {
  balloon.getAnimations().map((a) => a.pause());
}

// Añade una nueva nube
function addCloud() {
  const cloud = document.createElement("span");
  cloud.textContent = "☁️";
  const size = Math.random() * 20;
  cloud.style.fontSize = `${size}rem`;
  cloud.style.top = `${Math.random() * innerHeight}px`;
  cloud.style.left = `${Math.random() * innerWidth - (size * 16) / 2}px`;
  sky.append(cloud);
}

// Acaba la partida
function endGame() {
  gameOver = true;
  balloon.textContent = "💥";
  scoreboard.textContent = `Salvaste ${points} ${FLYING_ITEM}. Recarga para intentarlo de nuevo.`;
}

scoreboard.textContent = `No dejes que el ${FLYING_ITEM} llegue hasta arriba!`;
run();
