const gameBoard = (() => {
  const co = {
    'a': ['_','_','_'],
    'b': ['_','_','_'],
    'c': ['_','_','_'],
  }
  const board = [
    `[${co.a[0]}][${co.a[1]}][${co.a[2]}]`,
    `[${co.b[0]}][${co.b[1]}][${co.b[2]}]`,
    `[${co.c[0]}][${co.c[1]}][${co.c[2]}]`,
  ]
  return {
    co,
    board,
  }
})();
const winConditions = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], //across
  [1, 4, 7], [2, 5, 8], [3, 6, 9], //down
  [1, 5, 9], [3, 5, 7] //diagonal
];

function populateBoard() {
  const field = document.getElementById('board');
  gameBoard.gridStructure.forEach((element) => {
    const div = document.createElement('div');
    div.className = "grid-item";
    div.id = `slot${element}`;
    div.innerText = element;
    div.addEventListener('click', (e) => {
      e.target.innerText = markSquare(e.target.innerText);
    })
    field.appendChild(div);
  })
}

function markSquare(value) {
  if (value !== ('X' || 'O')) {
    return 'X'
  }
  return value;
}

function main() {
  populateBoard();
}

main();
