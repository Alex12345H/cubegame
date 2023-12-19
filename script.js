const gameContainer = document.querySelector('.game-container');
const player = document.getElementById('player');
const goal = document.getElementById('goal');
const scoreCounter = document.getElementById('scoreCounter');
const levelCounter = document.getElementById('levelCounter');
const leaderboardList = document.getElementById('leaderboardList');
const nameInput = document.getElementById('nameInput');

let level = 1;
let score = 0;
let leaderboardData = [];

function getRandomPosition() {
  const posX = Math.floor(Math.random() * (gameContainer.offsetWidth - 50));
  const posY = Math.floor(Math.random() * (gameContainer.offsetHeight - 50));
  return { x: posX, y: posY };
}

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

function addToLeaderboard() {
  const playerName = nameInput.value.trim();
  if (playerName !== '') {
    leaderboardData.push({ name: playerName, score });
    nameInput.value = '';
    updateLeaderboard();
  }
}

function movePlayer(event) {
  const maxX = gameContainer.offsetWidth - player.offsetWidth;
  const maxY = gameContainer.offsetHeight - player.offsetHeight;

  const x = Math.min(Math.max(0, event.clientX - gameContainer.getBoundingClientRect().left), maxX);
  const y = Math.min(Math.max(0, event.clientY - gameContainer.getBoundingClientRect().top), maxY);

  player.style.left = x + 'px';
  player.style.top = y + 'px';

  const playerRect = player.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();

  if (isColliding(playerRect, goalRect)) {
    score += 10;
    level++;
    updateScore();
    updateLevel();
    const newPos = getRandomPosition();
    goal.style.left = newPos.x + 'px';
    goal.style.top = newPos.y + 'px';
  }
}

function isColliding(a, b) {
  return !(a.bottom < b.top || a.top > b.bottom || a.right < b.left || a.left > b.right);
}

gameContainer.addEventListener('mousemove', movePlayer);

updateScore();
updateLevel();
updateLeaderboard();
