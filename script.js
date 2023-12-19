const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
const goal = document.querySelector('.goal');
const scoreCounter = document.getElementById('scoreCounter');
const levelCounter = document.getElementById('levelCounter');
let score = 0;
let level = 1;

function updateScore() {
  scoreCounter.textContent = `Score: ${score}`;
}

function updateLevel() {
  levelCounter.textContent = `Level: ${level}`;
}

function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  gameContainer.appendChild(obstacle);
  return obstacle;
}

function setGoalPosition() {
  let goalX, goalY;
  do {
    goalX = Math.random() * (gameContainer.offsetWidth - 30);
    goalY = Math.random() * (gameContainer.offsetHeight - 30);
    goal.style.left = goalX + 'px';
    goal.style.top = goalY + 'px';
  } while (checkCollision(goal, player));

  const obstacles = document.querySelectorAll('.obstacle');
  obstacles.forEach(obstacle => {
    if (checkCollision(goal, obstacle)) {
      setGoalPosition(); // Falls das Ziel in einem Hindernis generiert wird, erneut positionieren
    }
  });
}

function checkCollision(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function generateObstacles() {
  for (let i = 0; i < 2 * level; i++) {
    const obstacle = createObstacle();
    let obstacleX, obstacleY;
    do {
      obstacleX = Math.random() * (gameContainer.offsetWidth - 30);
      obstacleY = Math.random() * (gameContainer.offsetHeight - 30);
      obstacle.style.left = obstacleX + 'px';
      obstacle.style.top = obstacleY + 'px';
    } while (checkCollision(obstacle, player) || checkCollision(obstacle, goal));
  }
}

// Weitere Spiel-Logik hier implementieren...

setGoalPosition();
generateObstacles();
updateScore();
updateLevel();
