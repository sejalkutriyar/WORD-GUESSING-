const wordList = ["plane", "candy", "stone", "grape","apple","areca","betel","chard","chive","choko","cress","cubeb","drupe","eater","enoki","galia","gourd","guava","jaffa","laver"]
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
const maxAttempts = 6;
let attempts = 0;
const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");
function initBoard() {
    for (let i = 0; i < maxAttempts * 5; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        gameBoard.appendChild(tile);
    }
}
initBoard();
submitBtn.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 5) {
        message.textContent = "Please enter a valid 5-letter word.";
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `Game over! The word was "${secretWord}"`;
        return;
    }

    const rowStart = attempts * 5;
    const tiles = document.querySelectorAll(".tile");

    let guessResult = Array(5).fill("absent");
    const wordMap = {};

    for (const char of secretWord) {
        wordMap[char] = (wordMap[char] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        if (guess[i] === secretWord[i]) {
            guessResult[i] = "correct";
            wordMap[guess[i]]--;
        }
    }
    for (let i = 0; i < 5; i++) {
        if (
            guessResult[i] !== "correct" &&
            wordMap[guess[i]] > 0
        ) {
            guessResult[i] = "present";
            wordMap[guess[i]]--;
        }
    }

    for (let i = 0; i < 5; i++) {
        const tile = tiles[rowStart + i];
        tile.textContent = guess[i].toUpperCase();
        tile.classList.add(guessResult[i]);
    }

    attempts++;
    guessInput.value = "";
    if (guess === secretWord) {
        message.textContent = "Congratulations! You guessed the word!";
        submitBtn.disabled = true;
    } else if (attempts >= maxAttempts) {
        message.textContent = `Game over! The word was "${secretWord}"`;
        submitBtn.disabled = true;
    } else {
        message.textContent = `You have ${maxAttempts - attempts} attempts left`;
    }
});
