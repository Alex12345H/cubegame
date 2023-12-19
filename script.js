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

// Funktion zur Überprüfung von Kollisionen
function isColliding(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

// Funktion zur Platzierung des Ziels
function setGoalPosition() {
  let randomX, randomY;
  do {
    randomX = Math.floor(Math.random() * (gameContainer.offsetWidth - 30));
    randomY = Math.floor(Math.random() * (gameContainer.offsetHeight - 30));
  } while (isOverlapping(randomX, randomY));

  goal.style.left = randomX + 'px';
  goal.style.top = randomY + 'px';
}

// Funktion zur Überprüfung von Überlappungen mit Hindernissen
function isOverlapping(x, y) {
  // Implementierung der Überlappungsprüfung
  return false; // Platzhalter - Ihre Kollisionslogik hier einfügen
}

// Funktion zur Generierung von Hindernissen
function generateObstacles() {
  // Hindernisse generieren und positionieren
  // ...

  // Beispiel:
  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  obstacle.style.left = '200px'; // Beispielposition - ändern Sie dies entsprechend Ihrer Logik
  obstacle.style.top = '100px'; // Beispielposition - ändern Sie dies entsprechend Ihrer Logik
  gameContainer.appendChild(obstacle);
}

// Spiel-Logik
function gameLogic() {
  // Spielerbewegung, Kollisionserkennung, etc.
  // ...

  if (isColliding(player, goal)) {
    // Spieler hat das Ziel erreicht
    score += 30;
    level++;
    updateScore();
    updateLevel();
    setGoalPosition();
    generateObstacles();
    alert('Hurra! Du hast das Level geschafft!');
  }

  // Kollisionserkennung mit Hindernissen
  const obstacles = document.querySelectorAll('.obstacle');
  obstacles.forEach((obstacle) => {
    if (isColliding(player, obstacle)) {
      // Kollision mit Hindernis
      score -= 10;
      updateScore();
      alert('Oh nein! Du hast ein Hindernis berührt!');
      // Weitere Aktionen für eine Kollision mit einem Hindernis hier ausführen
    }
  });
}

// Spiel-Loop starten
setGoalPosition();
generateObstacles();
updateScore();
updateLevel();
gameLogic();
