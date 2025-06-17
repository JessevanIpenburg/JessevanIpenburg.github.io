const cells = document.querySelectorAll('.grass');
const statusDisplay = document.querySelector('.game--status');
const restartButton = document.querySelector('.game--restart');

let gameActive = true;
let currentPlayer = 'You';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let scores = { You: 0, AI: 0 };

const xImageURL = 'img/Mario2.png';
const oImageURL = 'img/Wario.png';

const updateStatus = () => {
    if (!gameActive) return;
    statusDisplay.textContent = currentPlayer === 'You' ? "Your turn!" : "Wario is thinking...";
};

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            scores[currentPlayer]++;
            updateScoreboard();
            statusDisplay.textContent = `${currentPlayer} wins this round! 🎉`;
            return true;
        }
    }

    if (!gameState.includes('')) {
        gameActive = false;
        statusDisplay.textContent = 'Draw! 🤝';
        return true;
    }
    return false;
};

const updateScoreboard = () => {
    document.querySelector('.scoreboard').innerHTML = `
        <p>You: ${scores.You}</p>
        <p>AI: ${scores.AI}</p>
    `;
};

// de robot kiest een random empty cell
const aiMove = () => {
    const emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') emptyCells.push(index);
    });

    if (emptyCells.length > 0) {
        const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomCellIndex] = 'AI';

        //plaatjes voor de robot 
        const img = document.createElement('img');
        img.src = oImageURL;
        img.alt = 'AI';
        img.classList.add('player-image');
        cells[randomCellIndex].appendChild(img);
        cells[randomCellIndex].classList.add('taken');

        if (!checkWin()) {
            currentPlayer = 'You';
            updateStatus();
            enablePlayerInteraction();
        }
    }
};
// de speler is aan de beurt
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-cell-index');
    if (!gameActive || currentPlayer !== 'You' || gameState[cellIndex]) return;

    gameState[cellIndex] = 'You';

    const img = document.createElement('img');
    img.src = xImageURL;
    img.alt = 'You';
    img.classList.add('player-image');
    e.target.appendChild(img);
    e.target.classList.add('taken');

    if (!checkWin()) {
        currentPlayer = 'AI';
        updateStatus();
        disablePlayerInteraction();
        setTimeout(aiMove, 1000);
    }
};

//als de robot aan de beurt is mag jij niet klicken
const disablePlayerInteraction = () => {
    cells.forEach(cell => cell.style.pointerEvents = 'none');
};

//als jij weer aan de beurt bent mag je weer klicken
const enablePlayerInteraction = () => {
    cells.forEach(cell => {
        if (!cell.classList.contains('taken')) {
            cell.style.pointerEvents = 'auto';
        }
    });
};

//restart de game
const restartGame = () => {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'You';

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('taken');
        cell.style.pointerEvents = 'auto';
    });

    updateStatus();
    updateScoreboard();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

updateScoreboard();
updateStatus();
