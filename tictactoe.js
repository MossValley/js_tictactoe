const Game = ((player1, player2) => {
  let whoIsPlaying = player1;
  let player1Turn = true;
  let endGame = { gameOver: false, winner: {name: null, mark: null} };

  const gridStructure = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const playerTurn = () => {
    if (player1Turn) {
      whoIsPlaying = player2;
      player1Turn = false;
    } else {
      whoIsPlaying = player1;
      player1Turn = true;
    }
  }

  const checkSquare = (value) => {
    const isGameOver = whoIsPlaying.markSquare(value);
    const result = whoIsPlaying.mark;
    if (!isGameOver) {
      playerTurn();
      return result;
    }
    endGame.gameOver = isGameOver;
    endGame.winner = {name: whoIsPlaying.name, mark: whoIsPlaying.mark}
    return result;
  }

  const populateBoard = () => {
    const field = document.getElementById('board');
    gridStructure.forEach((element) => {
      const div = document.createElement('div');
      div.className = "grid-item";
      div.id = element;
      div.innerText = element;
      div.addEventListener('click', clickResponse)
      field.appendChild(div);
    })
  }

  const clickResponse = (e) => {
    e.target.innerText = checkSquare(e.target.innerText);
    if (endGame.gameOver) {
      declareWinner(endGame.winner);
      deactivateBoard();
    }
    e.currentTarget.removeEventListener(e.type, clickResponse);
  }

  const declareWinner = (winner) => {
    const win = document.getElementById('winnerTag');
    const div = document.createElement('div');
    div.className = 'winner';
    div.innerText = `${winner.name} of ${winner.mark} is the winner!`
    win.append(div);
  }

  const deactivateBoard = () => {
    const gridElements = document.getElementsByClassName('grid-item');
    for (let i = 0; i <= gridElements.length - 1; i++) {
      gridElements.item(i).removeEventListener('click', clickResponse);
    }
  }

  return {
    gridStructure,
    checkSquare,
    endGame,
    populateBoard,
  }
});

const Player = ((name, mark) => {
  const squaresMarked = [];

  const markSquare = (gridSquare) => {
    square = parseInt(gridSquare);
    if (!squaresMarked.includes(square)) {
      squaresMarked.push(square);
    }
    if (squaresMarked.length >= 3) {
      const winner = checkWin()
      return winner;
    }
  }

  const winConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //across
    [1, 4, 7], [2, 5, 8], [3, 6, 9], //down
    [1, 5, 9], [3, 5, 7] //diagonal
  ];

  function checkWin() {
    let isWinner = false;
    winConditions.forEach((sequence) => {
      let counter = 0;
      if (!isWinner) {
        squaresMarked.forEach((square) => {
          if (!sequence.includes(square)) {
            return
          }
          counter++;
        })
        if (counter === 3) {
          isWinner = true;
        } else {
          counter === 0;
        }
      }
    })
    return isWinner;
  }
  return {name, mark, markSquare};
});

function main() {
  const player1 = Player('bob', 'X');
  const player2 = Player('bill', '0');
  const board = Game(player1, player2)
  board.populateBoard();
}

main();
