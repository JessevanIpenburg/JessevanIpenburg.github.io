const statusDisplay = document.querySelector('.game--status');
const restartButton = document.querySelector('.game--restart');
const cells = document.querySelectorAll('.grass');


//sound
const sounds = {
    Mario: 'img/boem.mp3',
    Luigi: 'img/boem.mp3',
    click: 'img/boem.mp3', 
};



const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
};


let gameActive = true;
let currentPlayer = 'Mario';
let gameState = ['', '', '', '', '', '', '', '', ''];


//hoe kan je winnen
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

//plaatjes van de poppetjes
const xImageURL = 'img/Mario2.png';
const oImageURL = 'https://www.models-resource.com/resources/big_icons/40/39097.png';

//prompt om je naam in te vullen
let scores = { Mario: 0, Luigi: 0 };
let player1Name = prompt("Enter Player 1 Name (Mario):", "Mario") || "Mario";
let player2Name = prompt("Enter Player 2 Name (Luigi):", "Luigi") || "Luigi";

//wie is er aan de beurt?
const updateStatus = () => {
    if (!gameActive) return;
    statusDisplay.textContent = `It's ${currentPlayer === 'Mario' ? player1Name : player2Name}'s turn`;
};


//+1 op de scoreboard
const updateScoreboard = () => {
    document.querySelector('.scoreboard').innerHTML = `
        <p>${player1Name}: ${scores.Mario}</p>
        <p>${player2Name}: ${scores.Luigi}</p>
    `;
};

//wie heeft er gewonnen?
const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            scores[currentPlayer]++;
            updateScoreboard();

            if (scores[currentPlayer] === 5) {
                statusDisplay.textContent = `${currentPlayer === 'Mario' ? player1Name : player2Name} wins the game! 🎉`;
            } else {
                statusDisplay.textContent = `${currentPlayer === 'Mario' ? player1Name : player2Name} wins this round!`;
            }
            return;
        }
    }

    //als niemand wint en de game is afgelopen komt er draw te staan in de display
    if (!gameState.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'Draw! 🤝';
    }
};

//clicken dat je plaatje komt te staan met een geluidje
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-cell-index');
    if (!gameActive || gameState[cellIndex]) return;
    playSound(sounds.click);

    gameState[cellIndex] = currentPlayer;

    const img = document.createElement('img');
    img.src = currentPlayer === 'Mario' ? xImageURL : oImageURL;
    img.alt = currentPlayer;
    img.classList.add('player-image');
    e.target.appendChild(img);
    e.target.classList.add('taken');

    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'Mario' ? 'Luigi' : 'Mario';
        updateStatus();
    }
};

//restart button met geluidje en alle vakjes worden geleegd
const restartGame = () => {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    playSound(sounds.click);

    cells.forEach(cell => {
        cell.textContent = '';
        cell.innerHTML = '';
        cell.classList.remove('taken');
    });

    // als de score gelijk is aan 5 wint de persoon
    if (scores.Mario === 5 || scores.Luigi === 5) {
        scores = { Mario: 0, Luigi: 0 };
        currentPlayer = 'Mario';
        statusDisplay.textContent = 'Game reset! New match starting!';
        updateScoreboard();
    } else {
        updateStatus();
    }
};
//test
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
playSound(sounds.click);

updateScoreboard();
updateStatus();


