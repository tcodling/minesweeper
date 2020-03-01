document.addEventListener('DOMContentLoaded', startGame)


// Board object generation 3x3
let size = 3
let board = {cells: []}
generateBoard()
function generateBoard() {
  for (i=0; i<size; i++) {
    for(q=0; q<size; q++) {
      board.cells.push({
        row: i,
        col: q,
        isMine: Math.random() < 0.5, 
        hidden: true
      })
    }
  }
}

// Reset the board function
function resetBoard() {
  // Remove existing board
  let gameBoard = document.querySelector('.board')
  gameBoard.parentNode.removeChild(gameBoard)
  // Add new board div
  let newBoard = document.createElement('div')
  document.body.appendChild(newBoard)
  newBoard.classList.add('board')
  // Run the initial game setup again
  board = {cells: []}
  generateBoard()
  startGame()
}

function startGame () {
  for (i in board.cells) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById('reset').addEventListener('click', resetBoard)
  let sizes = document.querySelectorAll('button')
  console.log(sizes)
  for (q=0; q<sizes.length; q++) {
    console.log(sizes[q])
    sizes[q].addEventListener('click', () => {
      size = event.target.value
      console.log(size)
      resetBoard()
    })
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (i in board.cells) {
    if (board.cells[i].isMine === true && !board.cells[i].isMarked) {
      return
    } else if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return
    }
  }
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let count = 0
  let surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (i=0; i<surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++
    }
  }
  return count
}