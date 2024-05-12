let boxes = Array.from(document.getElementsByClassName("box"))  //Array.from tells it to create an array from an array like object
let restartBtn = document.getElementById("restartBtn")
let playerText = document.getElementById("playerText")
let scoreX = document.getElementById("scoreX")
let scoreO = document.getElementById("scoreO")
let playerTurnIndicator = document.getElementById("playerTurn");

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--WINNING-BLOCKS')

let playerXscore = 0
let playerOscore = 0
const O_PLAYER = "O"
const X_PLAYER = "X"
let currentPlayer = X_PLAYER

//KEEPS TRACK OF WHICH BLOCK WAS CLICKED TO PREVENT O FROM OVERWRITING X
let spaces = Array(9).fill(null) //CREATES 9 EMPTY SPACES

//ADD AN EVENT LISTENER TO EACH OF OUR ID'S
function startGame  (){
  boxes.forEach(function(box){
    box.addEventListener("click", boxClicked)})
}

function isDraw() {
    if (!playerHasWon() && spaces.every(space => space!== null)) {
      return true;
    }
    return false;
  }

function boxClicked(e){
    const id = e.target.id
    if(!spaces[id] && !playerHasWon()){ // falsy values
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        
         /*CALLING PLAYER HAS WON FUNCTION*/
        if(playerHasWon() ){
            playerText.textContent = `${currentPlayer} WINS!`
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
} else {
    playerOscore += 1;
    scoreO.textContent = playerOscore 
}
return;
} else if (isDraw()) {
    playerText.textContent = `DRAW!`; 
    return playerTurnIndicator.innerHTML= "Restart";
  } else {
    playerText.textContent = `💭 Hmm!`;
  } 

  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  playerTurnIndicator.innerHTML= `Player ${currentPlayer} turn!`;
}
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
for (const condition of winningCombos) { //ITERATION OF OBJECT WINNING COMBOS
    let [a, b, c] = condition
    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c]) ){
        return[a,b,c] //CHECKS WHETHER ALL THREE SPACES ARE OCCUPIED BY SAME PLAYER
    } playerTurnIndicator.innerHTML= ``
}
return false
}

/*END OF PLAYER HAS WON FUNCTION*/
//CREATING A RESTART BUTTON THAT CLEARS THE SPACE AND SETS THE BOX TO AN EMPTY STRING AND RESETS THE CURRENT PLAYER TO ITS DEFAULT(X_PLAYER)
restartBtn.addEventListener("click", restart)

function restart(){
    spaces.fill(null) //clears out the spaces 
    boxes.forEach(function(box){
        box.innerText = ''
        box.style.backgroundColor =''
            })
            playerText.textContent = ""
            currentPlayer = X_PLAYER
            playerTurnIndicator.innerHTML= `Player ${currentPlayer} turn!`
}

startGame()

/* 1.contains an array of elements which we gave the class box which rep the   9  squares.
2.Has the restart button
3.Has the playerText which contains the current player or winner.
4.Has the winnerIndicator which basically stores the background color for the winning blocks.
5.the players
 6. An array of 9 null values.
 7.startGamefunction adds an event listener to each of the 9 squares when you click on a box the boxclicked function is called.
 8.  boxClicked function
-It gets the id of the clicked square and checks if the square is empty (i.e., spaces[id] is null).
-If the square is empty, it sets the square's value to the current player (spaces[id] = currentPlayer) and updates the square's text content to the current player.
-It then calls the playerHasWon function to check if the current player has won.
-If the current player has won, it updates the playerText element to display the winner and highlights the winning blocks by setting their background color to the winnerIndicator value.
-If the current player has not won, it switches the current player to the other player (i.e., "X" becomes "O" and vice versa).
9.playerHasWon function
-This function checks if the current player has won by iterating through the winningCombos array.
-Each element in winningCombos is an array of three indices that represent a possible winning combination (e.g., [0, 1, 2] represents the top row).
-For each combination, it checks if all three squares are occupied by the same player (i.e., spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]).
-If a winning combination is found, it returns the indices of the winning blocks. Otherwise, it returns false.
 */
