// JavaScript für die Spiellogik
// Hier kannst du die Logik für das Platzieren und Entfernen von Blöcken, Spielerbewegungen usw. implementieren

// Beispielcode für das Hinzufügen eines Blocks in den Spielbereich
const gameArea = document.getElementById('gameArea');

function addBlock() {
  const block = document.createElement('div');
  block.classList.add('block');
  gameArea.appendChild(block);
}

// Beispiel: Füge einen Block hinzu, wenn die Seite geladen wird
window.onload = function() {
  addBlock();
};

