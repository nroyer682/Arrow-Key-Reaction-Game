
let score = 0;
let lives = 3;
let level = 1;
let gameInterval;
let levelUpInterval;
let isPaused = false;
let playerName = "";


const gameArea = document.querySelector('.game-area');
const scoreDisplay = document.querySelector('.score');
const livesDisplay = document.querySelector('.lives');
const levelDisplay = document.querySelector('.level');
const countdown = document.querySelector('.countdown');
const pauseBtn = document.querySelector('.pause-button');
const pauseOverlay = document.querySelector('.pause-overlay');
const resumeBtn = document.querySelector('.resume-button');
const restartBtn = document.querySelector('.restart-button');
const levelUpSound = new Audio('Sound/success.mp3');
const lostLifeSound = new Audio('Sound/error.mp3');
const apiURL1 = 'http://localhost:8080/leaderboard';
const apiURL2 = 'http://localhost:8080/submit-score';


function activateButton() {
    const startBtn = document.getElementById('start-button');
    const homePage = document.getElementById('home');
    const instructionsPage = document.getElementById('instructions');
    const gamePage = document.getElementById('game');
    // Start Button
    startBtn.addEventListener('click', function() {
        // Hides the home page
        homePage.classList.remove('active');
        homePage.classList.add('hidden');

        // Shows the instructions page
        instructionsPage.classList.remove('hidden');
        instructionsPage.classList.add('active');

        // Adds keydown listener for instructions page
        document.addEventListener('keydown', gamePlay);
    });

    // Transitions to Game Play
    function gamePlay(event) {
        if (instructionsPage.classList.contains('active')) {
            // Hides the instruction page
            instructionsPage.classList.remove('active');
            instructionsPage.classList.add('hidden');

            // Shows game play area
            gamePage.classList.remove('hidden');
            gamePage.classList.add('active');

            // Gets player name and displays it in game area
            const playerInput = document.getElementById('player');
            playerName = playerInput.value || "Player X"; // Default to "Player X" if input is empty
            document.getElementById('player-name-display').textContent = playerName;

            // Starts the countdown by calling startCountdown() function
            startCountdown(startGame);

            // Removes the keydown listener
            document.removeEventListener('keydown', gamePlay);
        }
    }
}

activateButton();

function startCountdown(callback) {
    let countdownTime = 3;
    countdown.textContent = countdownTime;
    countdown.classList.remove('hidden');

    const countdownInterval = setInterval(function () {
        countdownTime--;
        if (countdownTime > 0) {
            countdown.textContent = countdownTime;
        } else if (countdownTime === 0) {
            countdown.textContent = "Go!";
        } else {
            // Hides the countdown and starts the game
            clearInterval(countdownInterval);
            countdown.classList.add('hidden');
            callback(); // To start the game following the countdown
        }
    }, 1000);
    
}

function startGame() {
    levelDisplay.textContent = "Level: " + level;

    gameInterval = setInterval(function () {
        createArrow();
    }, 1500 - level * 50); // Base interval is 1.5 seconds (1500 ms) and is reduced as levels increase

    levelUpInterval = setInterval(function () {
        level++;
        levelDisplay.textContent = "Level: " + level;

        levelUpSound.play();

        showLevelUp(level);
    }, 15000);
}

function showLevelUp(level) {
    const levelUp = document.getElementById('level-up');
    levelUp.textContent = `Level ${level}`;
    levelUp.classList.remove('hidden');
    levelUp.classList.add('active');

    setTimeout(() => {
        levelUp.classList.remove('active');
        levelUp.classList.add('hidden');
    }, 2000);
}

function createArrow() {
    const arrows = ["➡️", "⬇️", "⬆️", "⬅️"];
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.textContent = arrows[Math.floor(Math.random() * arrows.length)];
    arrow.style.left = Math.random() * 40 + 40 + "%";

    // To add the arrow to the game area
    gameArea.appendChild(arrow);

    // Makes the arrows fall
    const fallDuration = 3000 / level;
    arrow.style.animation = `fall ${fallDuration}ms linear`;


    // Detects if an arrow reaches the bottom
    setTimeout( function () {
        if (isPaused) {
            return; // Ignores arrow detection when game is paused.
        }
        if (gameArea.contains(arrow)) {
            arrow.remove();
            loseLife(); // Removes a life when arrow touches the bottom.
        }
    }, fallDuration);
}



// Function to handle key input from user
function keyPress(event) {
    if (isPaused) {
        return; // Ignores key presses when game is paused.
    }

    // Arrow assignments
    const keyMap = {
        ArrowUp: "⬆️",
        ArrowDown: "⬇️",
        ArrowLeft: "⬅️",
        ArrowRight: "➡️"
    };
            const arrows = document.querySelectorAll(".arrow");
            for (let i = 0; i < arrows.length; i++) {
                const arrow = arrows[i];
                if (arrow.textContent === keyMap[event.key]) {
                    arrow.remove();
                    incrementScore();
                    break; // Exit the loop after removing one arrow
        }
}
}


// Increments the score
function incrementScore() {
    score += 10;
    scoreDisplay.textContent = "Score: " + score;
}

// When user loses a life
function loseLife() {
    if (isPaused) {
        return; // Ignores losing lives when game is paused.
    }
   
    if (lives >= 1) {
        lives--;
        lostLifeSound.currentTime = 0;
        lostLifeSound.play();
        const hearts = "❤️".repeat(Math.max(lives));
        livesDisplay.textContent = "Lives: " + hearts;
    }
     // Ensure lives does not go below 0
     if (lives === 0) {
        endGame(); // Calls endGame() function when all lives are lost
        return;
    }
}

// Ends the game
function endGame() {
    isPaused = true;
    clearInterval(gameInterval);
    clearInterval(levelUpInterval);

    submitScore(playerName, score)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        showScoreboard();
    })
    .catch(error => {
        console.error('Error submitting score:', error);
    });
}

  // Submits the score to the server
function submitScore(playerName, score) {
    return fetch(apiURL2, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName, score }),
    });
}

function showScoreboard() {
    fetch(apiURL1)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((leaderboard) => {
            const scoreboard = document.getElementById('scoreboard');
            scoreboard.innerHTML = `
            <h2 class="leaderboard-title">🏆 Leaderboard</h2>
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaderboard
                        .map(
                            (entry, i) => `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${entry.playerName}</td>
                                    <td>${entry.score}</td>
                                </tr>
                            `
                        )
                        .join('')}
                </tbody>
            </table>
            <button class="restart-button"> Play Again! </button>
        `;

            const newRestartBtn = scoreboard.querySelector('.restart-button');
            newRestartBtn.addEventListener('click', function () {
                location.reload();
            });

            scoreboard.classList.remove('hidden');
            scoreboard.classList.add('active');
            gameArea.classList.remove('active');
            gameArea.classList.add('hidden');
        })
        .catch((error) => {
            console.error("Error fetching leaderboard:", error);
            const scoreboard = document.getElementById('scoreboard');
            scoreboard.innerHTML = `
                <h2>Leaderboard</h2>
                <p>Unable to load leaderboard</p>
                <button id="restart-button">Restart</button>
            `;
            
            const newRestartBtn = scoreboard.querySelector('.restart-button');
            newRestartBtn.addEventListener('click', function () {
                location.reload();
            });
            
            scoreboard.classList.remove('hidden');
            scoreboard.classList.add('active');
            gameArea.classList.remove('active');
            gameArea.classList.add('hidden');
        });
}
document.addEventListener("keydown", keyPress);


pauseBtn.addEventListener('click', () => {
    if (!isPaused) {
        clearInterval(gameInterval);
        clearInterval(levelUpInterval);
         // Pause all falling arrows
         const arrows = document.querySelectorAll('.arrow');
         arrows.forEach(arrow => {
            arrow.style.animationPlayState = "paused";
         });
        pauseOverlay.classList.remove('hidden');
        isPaused = true;
    }
});


resumeBtn.addEventListener('click', () => {
    if (isPaused) {
         // Resume all falling arrows
         const arrows = document.querySelectorAll('.arrow');
         arrows.forEach(arrow => {
            arrow.style.animationPlayState = "running";
         });
        pauseOverlay.classList.add('hidden');
        isPaused = false;
        startGame();
    }
});

restartBtn.addEventListener('click', () => {
    if (isPaused) {
        location.reload();
    }
});
//export { incrementScore, loseLife, startCountdown };