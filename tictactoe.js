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

function populateBoard() {
  const field = document.getElementById('board');
  gameBoard.gridStructure.forEach((element) => {
    const div = document.createElement('div');
    div.className = "grid-item";
    div.id = `slot${element}`;
    div.innerText = element;
    field.appendChild(div);
  })
}

function main() {
  populateBoard();
}

main();
