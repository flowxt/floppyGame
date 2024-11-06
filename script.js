const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./media/flappy-bird-set.png";

// General settings
let gamePlaying = false; // Game is paused by default
const gravity = 0.5; // Gravité
const speed = 6.2; // Vitesse de l'oiseau
const size = [51, 36]; // Taille de l'oiseau
const jump = -11.5; // Force du saut

const cTenth = canvas.width / 10; // 1/10 de la largeur du canvas

// Ici on définit les différents états du jeu
let index = 0, // Index de l'animation
  bestScore = 0, // Meilleur score
  currentScore = 0, // Score actuel
  pipes = [], // Tableau des tuyaux
  flight, // Interval de l'animation de l'oiseau
  flyHeight; // Hauteur de l'oiseau

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

  // Affichage de l'oiseau
  ctx.drawImage(
    img,
    432,
    Math.floor((index % 9) / 3) * size[1],
    ...size,
    cTenth,
    flyHeight,
    ...size
  );

  flyHeight = canvas.height / 2 - size[1] / 2;

  window.requestAnimationFrame(render);
};
img.onload = render;
