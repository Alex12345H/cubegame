const player = document.getElementById('player');
const goal = document.getElementById('goal');
const gameContainer = document.querySelector('.game-container');
const scoreCounter = document.getElementById('scoreCounter');

let level = 1;
let obstaclesCount = 1;
let score = 0;

gameContainer.addEventListener('mousemove', function(event) {
  const x = event.clientX - gameContainer.getBoundingClientRect().left - player.offsetWidth / 2;
  const y = event.clientY - gameContainer.getBoundingClientRect().top - player.offsetHeight / 2;

  const maxX = gameContainer.offsetWidth - player.offsetWidth;
  const maxY = gameContainer.offsetHeight - player.offsetHeight;

  const boundedX = Math.min(Math.max(0, x), maxX);
  const boundedY = Math.min(Math.max(0, y), maxY);

  player.style.left = boundedX + 'px';
  player.style.top = boundedY + 'px';

  const playerRect = player.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();
  const obstacles = document.querySelectorAll('.obstacle');

  if (isColliding(playerRect, goalRect)) {
    level++;
    obstaclesCount++;
    score += 30;
    alert('Level ' + level);
    setLevel(level, obstaclesCount);
    updateScore();
  }

  for (let obstacle of obstacles) {
    const obstacleRect = obstacle.getBoundingClientRect();
    if (isColliding(playerRect, obstacleRect)) {
      obstacleCollision();
      alert('Du hast das Hindernis berührt! Versuche es erneut.');
      setLevel(level, obstaclesCount);
      break;
    }
  }
});

function isColliding(a, b) {
  return !(
    a.bottom < b.top ||
    a.top > b.bottom ||
    a.right < b.left ||
    a.left > b.right
  );
}

function setLevel(level, obstaclesCount) {
  const goalPosition = getNewPosition();
  goal.style.top = goalPosition.top + 'px';
  goal.style.left = goalPosition.left + 'px';

  const gameObstacles = document.querySelectorAll('.obstacle');
  for (let obstacle of gameObstacles) {
    obstacle.remove();
  }

  for (let i = 0; i < obstaclesCount; i++) {
    createObstacle();
  }
}

function getNewPosition() {
  const posX = Math.floor(Math.random() * (gameContainer.offsetWidth - 50));
  const posY = Math.floor(Math.random() * (gameContainer.offsetHeight - 50));

  return { top: posY, left: posX };
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  obstacle.style.top = Math.random() * (gameContainer.offsetHeight - 40) + 'px';
  obstacle.style.left = Math.random() * (gameContainer.offsetWidth - 40) + 'px';
  gameContainer.appendChild(obstacle);
}

function obstacleCollision() {
  score -= 10;
  updateScore();
}

function updateScore() {
  scoreCounter.textContent = 'Score: ' + score;
}
