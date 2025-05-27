console.log("Script carregado! ✅");

const scoreElement = document.querySelector(".score");
const gameOverText = document.querySelector(".game-over");
const finalScoreElement = document.querySelector(".final-score");
const pipe2 = document.querySelector(".pipe2");
const agrinho = document.querySelector(".agrinho");
const pipe = document.querySelector(".pipe");

const jumpSound = new Audio('./sounds/jump.wav');
jumpSound.play();

let score = 0;
let isJumping = false;

const jump = () => {
  if (isJumping) return;
  isJumping = true;
  agrinho.classList.add("jump");
  setTimeout(() => {
    agrinho.classList.remove("jump");
    isJumping = false;
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const pipePosition2 = pipe2.offsetLeft;
  const agrinhoPosition = +window.getComputedStyle(agrinho).bottom.replace('px', '');

  if (
    (pipePosition <= 120 && pipePosition > 0 && agrinhoPosition < 80) ||
    (pipePosition2 <= 120 && pipePosition2 > 0 && agrinhoPosition < 80)
  ) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    pipe2.style.animation = "none";
    pipe2.style.left = `${pipePosition2}px`;

    agrinho.style.animation = "none";
    agrinho.style.bottom = `${agrinhoPosition}px`;

    agrinho.src = './imgs/agrinho.gif';
    agrinho.style.width = '75px';
    agrinho.style.marginLeft = '50px';

    gameOverText.classList.remove('hidden');
    finalScoreElement.textContent = `Pontuação final: ${score}`;

    clearInterval(loop);
  } else {
    score++;
    scoreElement.textContent = `Pontuação: ${score}`;
  }
}, 10);

document.addEventListener("keydown", jump);
