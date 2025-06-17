// Selecteer de container die de grid bevat
const gridContainer = document.querySelector(".grid-container");

// Selecteer het element dat de score op het scherm toont
const scoreDisplay = document.querySelector(".score");

// Selecteer de startknop (eerste knop met de klasse game-btn)
const startButton = document.querySelector(".startBtn");

// Selecteer de resetknop (laatste knop met de klasse game-btn)
const resetButton = document.querySelector(".resetBtn");

// Definieer het initiële aantal rijen en kolommen voor de grid
let rows = 3; // Begin met een grid van 3 rijen
let cols = 3; // Begin met een grid van 3 kolommen

// Stel de initiële score in op 0
let score = 0;

// Variabele om het interval bij te houden dat de molen periodiek laat verschijnen
let moleInterval;

// Boolean om bij te houden of het spel gestart is
let isStarted = false;

// Functie om een grid te genereren met een bepaald aantal rijen en kolommen
function makeRows(rows, cols) {
  // Stel CSS-variabelen in voor het aantal rijen en kolommen
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  
  // Maak de container leeg voordat je nieuwe cellen toevoegt
  gridContainer.innerHTML = '';

  // Voeg het juiste aantal cellen toe aan de grid
  for (let c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div"); // Maak een nieuw div-element
    cell.className = "grid-item";             // Geef de cel een klasse voor styling
    cell.addEventListener('click', onCellClick); // Voeg een klik-eventlistener toe
    gridContainer.appendChild(cell);         // Voeg de cel toe aan de container
  }
}

// Eventhandler voor wanneer een cel wordt aangeklikt
function onCellClick(event) {
  const cell = event.target; // Haal de aangeklikte cel op

  // Controleer of de cel een mol bevat en of het spel gestart is
  if (cell.classList.contains('mole') && isStarted === true) {
    score++; // Verhoog de score als de mol wordt geraakt
    cell.classList.remove('mole'); // Verwijder de mol uit de cel
  } else {
    if (isStarted === true) {
      score--; // Verlaag de score als op een lege cel wordt geklikt
    }
  }
  updateScore(); // Werk de score bij op het scherm
  checkWinOrExpand(); // Controleer of het bord moet worden uitgebreid of het spel is gewonnen
}

// Functie om de score op het scherm bij te werken
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`; // Toon de huidige score
}

// Functie om een mol willekeurig op een cel te tonen
function showMole() {
  const cells = document.querySelectorAll('.grid-item'); // Haal alle cellen op
  cells.forEach(cell => cell.classList.remove('mole')); // Verwijder eventuele bestaande mollen
  const randomIndex = Math.floor(Math.random() * cells.length); // Kies een willekeurige index
  cells[randomIndex].classList.add('mole'); // Voeg een mol toe aan de willekeurige cel
}

// Functie om het spel te starten
function startGame() {
  clearInterval(moleInterval); // Zorg ervoor dat eerdere intervallen worden gestopt
  score = 0; // Reset de score naar 0
  rows = 3; // Reset het bord naar 3x3
  cols = 3;
  updateScore(); // Werk de score bij op het scherm
  makeRows(rows, cols); // Genereer een nieuwe grid

  // Stel een interval in om de mol periodiek te laten verschijnen
  moleInterval = setInterval(() => {
    showMole(); // Toon een mol op een willekeurige locatie
  }, Math.random() * 1000 + 500); // Interval tussen 500ms en 1500ms
  
  isStarted = true; // Zet de spelstatus naar gestart
}

// Functie om het bord uit te breiden of het spel te beëindigen
function checkWinOrExpand() {
  if (score == 15) {
    alert('You win!'); // Toon een bericht als de speler wint
    clearInterval(moleInterval); // Stop het interval
  } else if (score >= 10) {
    rows = 6; // Verhoog het bord naar 6x6
    cols = 6;
    makeRows(rows, cols); // Genereer de grotere grid
  } else if (score >= 8 && score < 10) {
    rows = 5; // Verhoog het bord naar 5x5
    cols = 5;
    makeRows(rows, cols);
  } else if (score >= 5 && score < 8) {
    rows = 4; // Verhoog het bord naar 4x4
    cols = 4;
    makeRows(rows, cols);
  } else if (score < 5) {
    rows = 3; // Houd het bord op 3x3
    cols = 3;
    makeRows(rows, cols);
  }
}

// Eventlistener voor de resetknop
resetButton.addEventListener('click', () => {
  clearInterval(moleInterval); // Stop het interval
  score = 0; // Reset de score
  rows = 3; // Reset het bord naar 3x3
  cols = 3;
  updateScore(); // Werk de score bij op het scherm
  makeRows(rows, cols); // Genereer de standaard grid
});

// Eventlistener voor de startknop
startButton.addEventListener('click', startGame); // Start het spel wanneer de knop wordt ingedrukt

// Genereer een grid bij het laden van de pagina
makeRows(rows, cols);
