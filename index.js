let boxes = Array.from(document.getElementsByClassName("box"))  //Array.from tells it to create an array from an array like object
let restartBtn = document.getElementById("restartBtn")
let playerText = document.getElementById("playerText")

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--WINNING-BLOCKS')


const O_PLAYER = "O"
const X_PLAYER = "X"
let currentPlayer = X_PLAYER
//KEEPS TRACK OF WHICH BLOCK WAS CLICKED TO PREVENT O FROM OVERWRITING X

let spaces = Array(9).fill(null)//CREATES 9 EMPTY SPACES
//ADD AN EVENT LISTENER TO EACH OF OUR ID'S

const startGame = function(){
 boxes.forEach(function(box){
    box.addEventListener("click", boxClicked)})
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id] ){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

         /*CALLING PLAYER HAS WON FUNCTION*/
        if(playerHasWon() ){
            playerText.textContent = `${currentPlayer} has WON!`
            let winning_blocks = playerHasWon();
     if (winning_blocks) {
       for (var i = 0; i < winning_blocks.length; i++) {
         var box = winning_blocks[i];
       boxes[box].style.backgroundColor = winnerIndicator;
  }
}
        }
        
        if (currentPlayer === 'X' ) {
            currentPlayer = 'O';
          } else {
            currentPlayer = 'X';
          }
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
    }
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
}
startGame()