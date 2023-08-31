let wordList = ["cachorro", "hangman", "javascript", "programming", "example"];

class HangmanGame {
    constructor(wordList) {
        this.wordList = wordList;
        this.word = "";
        this.hiddenWord = [];
        this.guessedLetters = [];
        this.attemptsLeft = 6;
        this.canvasWidth = 400;
        this.canvasHeight = 400;
        this.setupCanvas();
        this.pickWord();
        this.initializeHiddenWord();
    }

    setupCanvas() {
        createCanvas(this.canvasWidth, this.canvasHeight);
        frameRate(2);
    }

    pickWord() {
        this.word = random(this.wordList);
    }

    initializeHiddenWord() {
        for (let i = 0; i < this.word.length; i++) {
            this.hiddenWord[i] = "_";
        }
    }

    keyPressed() {
        let keyLowerCase = key.toLowerCase();
        if (this.isLetter(keyLowerCase) && !this.guessedLetters.includes(keyLowerCase)) {
            this.guessedLetters.push(keyLowerCase);
            if (this.word.includes(keyLowerCase)) {
                this.updateHiddenWord(keyLowerCase);
            } else {
                this.attemptsLeft--;
            }
        }
    }

    updateHiddenWord(letter) {
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i] === letter) {
                this.hiddenWord[i] = letter;
            }
        }
    }

    isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    draw() {
        background(220);
        this.drawHangman(this.attemptsLeft);
        this.displayHiddenWord();
        this.displayGuessedLetters();
        this.displayAttemptsLeft();
        this.checkGameOver();
    }

    drawHangman(attemptsLeft) {
        let startY = 50;
        let bodyHeight = 55;
        let gallowsHangerHeight = 70;
        let headSize = 40;
        let gallowsRopeY = startY + gallowsHangerHeight;
        let armStart = gallowsRopeY + headSize / 2;
        let legStart = gallowsRopeY + bodyHeight;
        let startX =  this.canvasWidth / 2 - 75;

        // Draw gallows
        line(startX, startY, startX + 150, startY);
        line(startX + 75, startY, startX + 75, startY + 200);
        line(startX, startY, startX, gallowsRopeY);

        // Draw person

        if (attemptsLeft <= 4) {
            line(startX, gallowsRopeY, startX, gallowsRopeY + bodyHeight); // body
        }
        if (attemptsLeft <= 3) {
            line(startX, armStart, startX - 20, armStart + 40); // left arm
        }
        if (attemptsLeft <= 2) {
            line(startX, armStart, startX + 20, armStart + 40); // right arm
        }
        if (attemptsLeft <= 1) {
            line(startX, legStart, startX - 20, legStart + 55); // left leg
        }
        if (attemptsLeft === 0) {
            line(startX, legStart, startX + 20, legStart + 55); // right leg
        }
        if (attemptsLeft <= 5) {
            // The head must be the last drawed element to not be overlaped by other elements
            ellipse(startX, gallowsRopeY, headSize, headSize); // head 
        }
    }

    displayHiddenWord() {
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.hiddenWord.join(" "), this.canvasWidth / 2, this.canvasHeight * 0.75);
    }

    displayGuessedLetters() {
        textAlign(LEFT);
        textSize(16);
        text("letras: " + this.guessedLetters.join(", "), 10, 20);
    }

    displayAttemptsLeft() {
        textAlign(RIGHT);
        textSize(16);
        text("Tentativas restantes: " + this.attemptsLeft, this.canvasWidth - 10, 20);
    }

    checkGameOver() {
        if (this.hiddenWord.join("") === this.word) {
            this.displayResult("You Win!");
        } else if (this.attemptsLeft === 0) {
            this.displayResult("Game Over");
        }
    }

    displayResult(message) {
        textSize(32);
        text(message, this.canvasWidth / 2, this.canvasHeight - 50);
        noLoop();
    }
}

let game;

function setup() {
    game = new HangmanGame(wordList);
}

function draw() {
    game.draw();
}

function keyPressed() {
    game.keyPressed();
}
