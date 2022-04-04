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
    console.log('field', field);
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
    const theWinnerIs = document.getElementById('winnerTag');
    const div = document.createElement('div');
    div.className = 'winner';
    div.innerText = `${winner.name} of ${winner.mark} is the winner!`
    theWinnerIs.append(div);
  }

  const deactivateBoard = () => {
    const gridElements = document.getElementsByClassName('grid-item');
    for (let i = 0; i <= gridElements.length - 1; i++) {
      gridElements.item(i).removeEventListener('click', clickResponse);
    }
  }

  const removeWinner = () => {
    const theWinnerIs = document.getElementById('winnerTag');
    while (theWinnerIs.lastChild) {
      theWinnerIs.removeChild(theWinnerIs.lastChild);
    }
    endGame.gameOver = false;
    endGame.winner = {name: null, mark: null};
  }

  const resetBoard = () => {
    const field = document.getElementById('board');
      while (field.lastChild) {
        field.removeChild(field.lastChild);
      }
    player1.resetMarkedSquares();
    player2.resetMarkedSquares();
    removeWinner();
    populateBoard();
  }

  return {
    gridStructure,
    checkSquare,
    endGame,
    populateBoard,
    resetBoard,
  }
});

const Player = ((name, mark) => {
  let squaresMarked = [];

  const resetMarkedSquares = () => {
    squaresMarked = [];
  };

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
  return {name, mark, markSquare, resetMarkedSquares};
});

const Environment = (board) => {
  const gameBoard = board;
  const buttonArray = [];

  const makeEnv = () => {
    const baseLayer = document.getElementById('environment');
    console.log('baselayer', baseLayer);
    const boardDiv = document.createElement('div');
    const controls = document.createElement('div');
    const announcement = document.createElement('div');

    boardDiv.id = 'board';
    boardDiv.className = 'grid-container';
    controls.id = 'buttons';
    announcement.id = 'winnerTag';

    baseLayer.appendChild(boardDiv);
    baseLayer.appendChild(controls);
    baseLayer.appendChild(announcement);

    gameBoard.populateBoard();
  }

  const buttons = {
    reset:{
      name: 'reset',
      function: gameBoard.resetBoard,
    }
  };
  buttonArray.push(buttons.reset);

  const addButtons = () => {
    const div = document.getElementById('buttons');
    console.log(buttonArray);
    buttonArray.forEach((button) => {
      btn = document.createElement('btn');
      btn.id = 'btn';
      btn.textContent = `${button.name}`;
      btn.addEventListener('click', button.function);
      div.appendChild(btn);
    })
  }

  return {makeEnv, addButtons};
}

function main() {
  const player1 = Player('bob', 'X');
  const player2 = Player('bill', '0');
  const board = Game(player1, player2)
  const initialize = Environment(board);
  initialize.makeEnv();
  initialize.addButtons();
}

main();
