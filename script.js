const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";

// General settings
let gamePlaying = false; // Game is paused by default
const gravity = 0.4; // Gravité
const speed = 5.2; // Vitesse de l'oiseau
const size = [51, 36]; // Taille de l'oiseau
const jump = -11.5; // Force du saut

const cTenth = canvas.width / 10; // 1/10 de la largeur du canvas

//Pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () =>
  Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) +
  pipeWidth;

// Ici on définit les différents états du jeu
let index = 0, // Index de l'animation
  bestScore = 0, // Meilleur score
  currentScore = 0, // Score actuel
  pipes = [], // Tableau des tuyaux
  flight, // Interval de l'animation de l'oiseau
  flyHeight; // Hauteur de l'oiseau

const setup = () => {
  currentScore = 0;
  flight = jump;
  flyHeight = canvas.height / 2 - size[1] / 2;

  pipes = Array(3)
    .fill()
    .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
};

const render = () => {
  index++;

  // background
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width) + canvas.width,
    0,
    canvas.width,
    canvas.height
  );
  ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height,
    -((index * (speed / 2)) % canvas.width),
    0,
    canvas.width,
    canvas.height
  );

  if (gamePlaying) {
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 18) / 9) * size[1],
      ...size,
      cTenth,
      flyHeight,
      ...size
    );
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    // Affichage de l'oiseau
    ctx.drawImage(
      img,
      432,
      Math.floor((index % 18) / 9) * size[1],
      ...size,
      cTenth,
      flyHeight,
      ...size
    );

    flyHeight = canvas.height / 2 - size[1] / 2;

    ctx.fillText(`Meilleur score : ${bestScore}`, 55, 245);
    ctx.fillText(`Cliquez pour jouer`, 48, 535);
    ctx.font = "bold 30px courier";
  }
  window.requestAnimationFrame(render);
};

setup();
img.onload = render;

document.addEventListener("click", () => (gamePlaying = true));
window.onclick = () => {
  if (flyHeight <= 0) return;
  flight = jump;
};
