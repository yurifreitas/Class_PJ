let wordList = ["cachorro","hangman", "javascript", "programming", "example"]; // Lista de palavras
let word; // Palavra escolhida
let hiddenWord = []; // Palavra escondida (com underscores)
let guessedLetters = []; // Letras já adivinhadas
let attemptsLeft = 6; // Número de tentativas restantes

function setup() {
    createCanvas(400, 400);
    frameRate(2); // Taxa de atualização da tela
    pickWord();
    initializeHiddenWord();
}

function draw() {
    background(220);
    displayHiddenWord();
    displayGuessedLetters();
    displayAttemptsLeft();
    checkGameOver();
}

function pickWord() {
    word = random(wordList);
}

function initializeHiddenWord() {
    for (let i = 0; i < word.length; i++) {
        hiddenWord[i] = "_";
    }
}

function displayHiddenWord() {
    textAlign(CENTER, CENTER);
    textSize(32);
    text(hiddenWord.join(" "), width / 2, height / 2);
}

function displayGuessedLetters() {
    textAlign(LEFT);
    textSize(16);
    text("Gued Letters: " + guessedLetters.join(", "), 10, 20);
}

function displayAttemptsLeft() {
    textAlign(RIGHT);
    textSize(16);
    text("Attempts Left: " + attemptsLeft, width - 10, 20);
}

function keyPressed() {
    if (key >= 'a' && key <= 'z' && guessedLetters.indexOf(key) === -1) {
        guessedLetters.push(key);
        if (word.includes(key)) {
            updateHiddenWord(key);
        } else {
            attemptsLeft--;
        }
    }
}

function updateHiddenWord(letter) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            hiddenWord[i] = letter;
        }
    }
}

function checkGameOver() {
    if (hiddenWord.join("") === word) {
        textSize(32);
        text("You Win!", width / 2, height - 50);
        noLoop(); // Parar de atualizar o desenho
    } else if (attemptsLeft === 0) {
        textSize(32);
        text("Game Over", width / 2, height - 50);
        noLoop(); // Parar de atualizar o desenho
    }
}
