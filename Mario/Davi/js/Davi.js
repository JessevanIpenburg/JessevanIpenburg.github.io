let blockSize = 50;
let totalRows = 10;
let totalCols = 10;
let gameBoard = document.getElementById("game-board");  //Dit is de Game Board, en hier staat ook de grootte van het spel.

let snake = [{ x: 5, y: 5 }];
let food = { x: 0, y: 0 };
let direction = null;
let gameOver = false;
let gameInterval = null;
let applesEaten = 0;
let totalWins = 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0; // Dit laad de Highscore zien in de Pagina
let isChangingDirection = false;  // Dit stopt de speler om te snel om te draaien (Dit was een glitch waardoor de speler dood ging)

window.onload = function () {
    createGrid();
    placeFood();
    drawGame();
    document.addEventListener("keydown", startGame);
    updateScoreBoard();
};  //Dit laad alles wanneer het spel word opgestart.

function updateScoreBoard() {
    document.getElementById("apples-eaten").textContent = applesEaten;
    document.getElementById("total-wins").textContent = totalWins;
    document.getElementById("high-score").textContent = highScore;
} //Dit houd de Scoreboard bij.

function createGrid() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < totalRows * totalCols; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        gameBoard.appendChild(cell);
    }
} //Dit maakt de grid met de gegevens bovenaan.

function update() {
    if (gameOver) return;

    let head = { ...snake[0] };
    head.x += direction?.x || 0;
    head.y += direction?.y || 0;

    if (head.x < 0 || head.x >= totalCols || head.y < 0 || head.y >= totalRows) {
        gameOver = true;
        alert("Spel over! Je raakt de muur aan!");
        clearInterval(gameInterval);
        return; //Als je de muur aanraakt dan stopt het spel en heeft de speler verloren
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            alert("Spel over! Je hebt jezelf proberen op te eten!");
            clearInterval(gameInterval);
            return; //Als je jezelf aanraakt dan stopt het spel en heeft de speler verloren
        }
    }

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);  // Voegt een stuk lichaam toe aan de wiggler als hij heeft gegeten
        applesEaten++;
        placeFood();

        // Kijkt of de speler een nieuwe high-score heeft
        if (applesEaten > highScore) {
            highScore = applesEaten;
            localStorage.setItem("highScore", highScore);  // Slaat de HighScore op in Local Storage
        }
    } else {
        snake.unshift(head);   // Verplaats de slang door de kop toe te voegen aan het begin van de array
        snake.pop();  // Verwijder het laatste segment van de slang
    }

    drawGame();
    updateScoreBoard(); // Werk het scorebord bij
}

function drawGame() {
    const cells = document.querySelectorAll(".cell"); // Selecteer alle cellen in de grid

    cells.forEach(cell => {
        cell.innerHTML = ""; // Maak alle cellen leeg
    });

    snake.forEach((segment, index) => {
        const cellIndex = segment.y * totalCols + segment.x;
        const cell = cells[cellIndex];
        const isHead = index === 0; // Controleer of dit het kopsegment is
        const directionClass = getDirectionClass(segment);

        const segmentDiv = document.createElement("div");
        segmentDiv.classList.add(isHead ? "snake-head" : "snake-body", directionClass);
        cell.appendChild(segmentDiv); // Voeg het slangsegment toe aan de juiste cel
    });

    const foodIndex = food.y * totalCols + food.x; // Bereken het indexnummer van de cel voor het eten
    const foodCell = cells[foodIndex];
    const foodDiv = document.createElement("div");
    foodDiv.classList.add("food");
    foodCell.appendChild(foodDiv); // Voeg het voedsel toe aan de juiste cel
}

function getDirectionClass(segment) {
    if (direction?.x === 0 && direction?.y === -1) return "up";
    if (direction?.x === 0 && direction?.y === 1) return "down";
    if (direction?.x === -1 && direction?.y === 0) return "right";
    if (direction?.x === 1 && direction?.y === 0) return "left";
}  //Deze function ziet wanneer de speler draait

function placeFood() {
    do {
        food.x = Math.floor(Math.random() * totalCols);
        food.y = Math.floor(Math.random() * totalRows);
    } while (isFoodOnSnake(food.x, food.y));  //Dit plaatst het eten in een random vak van de grid
}

function isFoodOnSnake(x, y) {
    return snake.some(segment => segment.x === x && segment.y === y);
} //Dit zorgt ervoor dat het eten niet op de snake spawnt

function startGame(e) {
    if (gameInterval) return;

    if (e.code === "KeyW" || e.code === "KeyS" || e.code === "KeyA" || e.code === "KeyD") {
        changeDirection(e);
        gameInterval = setInterval(update, 150); //Hiermee kan je de snelheid van de snake aanpassen
    }

    document.removeEventListener("keydown", startGame);
    document.addEventListener("keydown", changeDirection);
}

function changeDirection(e) {
    if (isChangingDirection) return;  // Prevent processing multiple key events in the same frame
    isChangingDirection = true; // Block other direction changes for the current frame

    if (e.code === "KeyW" && direction?.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (e.code === "KeyS" && direction?.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (e.code === "KeyA" && direction?.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (e.code === "KeyD" && direction?.x !== -1) {
        direction = { x: 1, y: 0 };
    }

    setTimeout(() => {
        isChangingDirection = false;  //Dit zorgt ervoor dat de speler kan bewegen na de frame
    }, 90); // Allow direction change every 100ms (feel free to tweak this) Dit zort ervoor dat je de directie kan veranderen elke 90 miliseconde
}

function resetGame() {
    snake = [{ x: 5, y: 5 }];
    food = { x: 0, y: 0 };
    direction = null;
    gameOver = false;
    applesEaten = 0;
    updateScoreBoard();
    createGrid();
    placeFood();
    drawGame();
}  //Deze function reset de game met de reset knop.
