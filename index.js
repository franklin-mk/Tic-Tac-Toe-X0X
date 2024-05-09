let boxes = Array.from(document.getElementsByClassName("box"));
let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let undoBtn = document.getElementById("undo");
let playerTurnIndicator = document.getElementById("playerTurn");

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let count_plays = 0;
let movesHistory = [];

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id] && count_plays < 9) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        count_plays++;
        movesHistory.push(id);
        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} wins!`
            count_plays = 10;
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        playerTurnIndicator.innerText = `Player ${currentPlayer}'s turn`;
    }
    if (count_plays === 9) {
        playerText.innerHTML = "Draw!";
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
    spaces.fill(null);
    count_plays = 0;
    movesHistory = [];

    boxes.forEach(box => {
        box.innerText = "";
    });
    
    currentPlayer = X_TEXT;
    playerText.innerHTML = "💭 Hmm!"
    playerTurnIndicator.innerText = `Player ${currentPlayer}'s turn`;
}

undoBtn.addEventListener("click", function () {
    if (movesHistory.length > 0) {
        const lastMove = movesHistory.pop();
        const lastMoveBox = document.getElementById(lastMove);
        lastMoveBox.innerText = "";
        spaces[lastMove] = null;
        count_plays--;
        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        playerTurnIndicator.innerText = `Player ${currentPlayer}'s turn`;
    } else {
        undoBtn.disabled = true;

        if (count_plays === 9) {
            playerText.innerHTML = "Draw!";
        }
    }
});

startGame();