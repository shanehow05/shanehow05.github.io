

const cells = document.querySelectorAll('.cell');
const Player_X = 'X';
const Player_O = 'O';
let currentPlayer = Player_X;

const gameState = Array(cells.length);
gameState.fill(null);

const strike = document.getElementById('strike');
const gameRestart = document.getElementById('game--restart');
const restartText = document.getElementById('game--restart--text');
const gameBoard = document.getElementById('game--board');


cells.forEach(cells=>cells.addEventListener("click", cellClick, ));
// Makes each cell clickable by iterating through and addding click event listener

function cellClick(event) {
    
    
    const cell = event.target;
    const cellInput = cell.dataset.index; // named each cell an index 0-8
    if(cell.innerText != "") { // if cell.inner text does NOT = blank X or O is inside
        return;
    }  
    if (currentPlayer === Player_X) {
        cell.innerText = Player_X; // if its player x turn, let the cell that they choose be saved as thier value 
        gameState[cellInput - 1] = Player_X;
        currentPlayer = Player_O
    } else {
        cell.innerText = Player_O;
        gameState[cellInput - 1] = Player_O; // array goes from 0-8 and this updates our game board state // 
        currentPlayer = Player_X
    }
    checkWinner ();
    
}
//Function to check winning combinations. Using an array of object literals. attaching coressponding strike through 

function checkWinner () { 
    for (const winningCombo of winningCombos) {
        const {combos, strikeClass} = winningCombo
        const cellValue1 = gameState[combos[0]-1];
        const cellValue2 = gameState[combos[1]-1];
        const cellValue3 = gameState[combos[2]-1];

        if (cellValue1 != null && cellValue1 === cellValue2 && cellValue1 === cellValue3) {
            strike.classList.add(strikeClass);
            alert('You won!');
        } 
    }
}

const winningCombos = [
    {combos: [0,1,2], strikeClass: 'strike-row-1'},
    {combos: [3,4,5], strikeClass: 'strike-row-2'},
    {combos: [6,7,8], strikeClass: 'strike-row-3'},
    {combos: [0,3,6], strikeClass: 'strike-column-1'},
    {combos: [1,4,7], strikeClass: 'strike-column-2'},
    {combos: [2,5,8], strikeClass: 'strike-column-3'},
    {combos: [0,4,8], strikeClass: 'strike-diagonal-1'},
    {combos: [2,4,6], strikeClass: 'strike-diagonal-2'},    
]


gameRestart.addEventListener('click', restart)
function restart() {
    strike.className = 'strike';
    gameState.fill(null)

    cells.forEach(cell => {
        cell.innerText = " "
        
    })

}






