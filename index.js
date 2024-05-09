<<<<<<< HEAD
let boxes = Array.from(document.getElementsByClassName("box"));
let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let undoBtn = document.getElementById("undo");
let playerTurnIndicator = document.getElementById("playerTurn");
=======
let boxes = Array.from(document.getElementsByClassName("box"))  //Array.from tells it to create an array from an array like object
let restartBtn = document.getElementById("restartBtn")
let playerText = document.getElementById("playerText")
let scoreX = document.getElementById("scoreX")
let scoreO = document.getElementById("scoreO")
>>>>>>> a3c5656eda6e2b34bdc99ac94e0da861a54ef13c

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let count_plays = 0;
let movesHistory = [];

<<<<<<< HEAD
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
=======
let playerXscore = 0
let playerOscore = 0
const O_PLAYER = "O"
const X_PLAYER = "X"
let currentPlayer = X_PLAYER
//KEEPS TRACK OF WHICH BLOCK WAS CLICKED TO PREVENT O FROM OVERWRITING X

let spaces = Array(9).fill(null)//CREATES 9 EMPTY SPACES
//ADD AN EVENT LISTENER TO EACH OF OUR ID'S

  function startGame  (){
 boxes.forEach(function(box){
    box.addEventListener("click", boxClicked)})
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id] && !playerHasWon()){ // falsy values
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

         /*CALLING PLAYER HAS WON FUNCTION*/
        if(playerHasWon() ){
            playerText.textContent = `${currentPlayer} has WON!`
            let winning_blocks = playerHasWon();
     if (winning_blocks) {
       for (let i = 0; i < winning_blocks.length; i++) {
         let box = winning_blocks[i];
       boxes[box].style.backgroundColor = winnerIndicator;
      
  }
}
if (currentPlayer === X_PLAYER){
    playerXscore += 1;
    scoreX.textContent = playerXscore
}else{
    playerOscore += 1;
    scoreO.textContent = playerOscore 
}
return;
        }else{
            playerText.textContent = `💭 Hmm!`
>>>>>>> a3c5656eda6e2b34bdc99ac94e0da861a54ef13c
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