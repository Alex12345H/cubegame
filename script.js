const gameContainer = document.querySelector('.game-container');
const player = document.getElementById('player');
const goal = document.getElementById('goal');
const scoreCounter = document.getElementById('scoreCounter');
const levelCounter = document.getElementById('levelCounter');
const leaderboardList = document.getElementById('leaderboardList');
const obstacles = document.querySelectorAll('.obstacle');

let score = 0;
let level = 1;
let leaderboardData = [
  { name: 'Alexander Högg', score: 26643 },
  { name: 'Gamer Pro', score: 23443 },
  { name: 'Der Hacker', score: 12329 }
];

function updateScore() {
  scoreCounter.textContent = `Score: ${score}`;
}

function updateLevel() {
  levelCounter.textContent = `Level: ${level}`;
}

function updateLeaderboard() {
  leaderboardList.innerHTML = '';
  leaderboardData.sort((a, b) => b.score - a.score);

  leaderboardData.slice(0, 10).forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
    leaderboardList.appendChild(listItem);
  });
}

function obstacleCollision() {
  alert('Oh nein! Du hast ein Hindernis berührt!');
  score -= 10;
  updateScore();
}

function goalReached() {
  alert('Hurra! Du hast das Level geschafft!');
  level++;
  score += 30;
  updateLevel();
  updateScore();
  setGoalPosition();
  generateObstacles();
}

function setGoalPosition() {
  let goalX, goalY;
  do {
    goalX = Math.random() * (gameContainer.offsetWidth - 30);
    goalY = Math.random() * (gameContainer.offsetHeight - 30);
    goal.style.left = goalX + 'px';
    goal.style.top = goalY + 'px';
  } while (checkCollision(player, goal));
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
  obstacles.forEach(obstacle => obstacle.remove());

  const obstaclesCount = 2 * level;
  for (let i = 0; i < obstaclesCount; i++) {
    let obstacleX, obstacleY;
    do {
      obstacleX = Math.random() * (gameContainer.offsetWidth - 30);
      obstacleY = Math.random() * (gameContainer.offsetHeight - 30);
      obstacle.style.left = obstacleX + 'px';
      obstacle.style.top = obstacleY + 'px';
    } while (checkCollision(player, obstacle) || checkCollision(goal, obstacle));
    const newObstacle = obstacle.cloneNode(true);
    newObstacle.style.left = obstacleX + 'px';
    newObstacle.style.top = obstacleY + 'px';
    gameContainer.appendChild(newObstacle);
  }
}

gameContainer.addEventListener('mousemove', function(event) {
  // Hier Bewegungslogik für den Spieler implementieren
});

function obstacleCollisionDetection() {
  obstacles.forEach(obstacle => {
    if (checkCollision(player, obstacle)) {
      obstacleCollision();
    }
  });
}

function goalCollisionDetection() {
  if (checkCollision(player, goal)) {
    goalReached();
  }
}

setInterval(() => {
  obstacleCollisionDetection();
  goalCollisionDetection();
}, 100);

// Initialisierung des Spiels
updateScore();
updateLevel();
setGoalPosition();
generateObstacles();
