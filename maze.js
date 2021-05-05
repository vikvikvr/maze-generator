// The depth-first search algorithm of maze generation is frequently
// implemented using backtracking.
// This can be described with a following recursive routine:
console.log('kostas says hello');
console.log('Dave says hello');
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

$(() => {
  let grid = createGridStructure(30);
  makeMaze(grid);
});

function renderGrid(grid, currRow, currColumn) {
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid.length; column++) {
      const cell = grid[row][column];
      const isCurrent = currRow === row && currColumn === column;
      modifyCellElemnt(cell, isCurrent);
    }
  }
}

function modifyCellElemnt(cell, isCurrent) {
  const $div = $(`#cell-${cell.rowIndex}-${cell.columnIndex}`);
  // basic style
  $div.addClass(cell.wasVisited ? 'visited' : '');
  if (isCurrent) {
    $div.addClass('current');
  } else {
    $div.removeClass('current');
  }
  // hides walls
  if (!cell.topWall) $div.addClass('no-top');
  if (!cell.bottomWall) $div.addClass('no-bottom');
  if (!cell.leftWall) $div.addClass('no-left');
  if (!cell.rightWall) $div.addClass('no-right');
  return $div;
}

function createCellElement(cell) {
  const cellSize = 20;
  const $div = $('<div>');
  const cellId = `cell-${cell.rowIndex}-${cell.columnIndex}`;
  $div.attr('id', cellId);
  $div.addClass('cell');
  $div.css('left', cell.columnIndex * cellSize);
  $div.css('top', cell.rowIndex * cellSize);
  $div.css('width', cellSize);
  $div.css('height', cellSize);
  return $div;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function makeMaze(grid) {
  let currentCell = grid[0][0];
  let stack = [];
  let currRow = (currCol = 0);
  currentCell.wasVisited = true;
  stack.push(currentCell);
  while (stack.length) {
    currentCell = stack.pop();
    currRow = currentCell.rowIndex;
    currCol = currentCell.columnIndex;
    let unvisitedNeighbours = getUnvisitedNeighbours(currentCell, grid);
    if (unvisitedNeighbours.length) {
      stack.push(currentCell);
      let neighbourCell = pickRandomElementFromArray(unvisitedNeighbours);
      removeWallsBetweenCells(currentCell, neighbourCell);
      neighbourCell.wasVisited = true;
      currRow = neighbourCell.rowIndex;
      currCol = neighbourCell.columnIndex;
      stack.push(neighbourCell);
    }
    await sleep(20);
    renderGrid(grid, currRow, currCol);
  }
}

function getUnvisitedNeighbours(currentCell, grid) {
  const { rowIndex, columnIndex } = currentCell;
  const neighbours = [];

  if (rowIndex > 0) {
    const topNeighbour = grid[rowIndex - 1][columnIndex];
    neighbours.push(topNeighbour);
  }

  if (rowIndex + 1 < grid.length) {
    const bottomNeighbour = grid[rowIndex + 1][columnIndex];
    neighbours.push(bottomNeighbour);
  }

  if (columnIndex > 0) {
    const leftNeighbour = grid[rowIndex][columnIndex - 1];
    neighbours.push(leftNeighbour);
  }

  if (columnIndex + 1 < grid.length) {
    const rightNeighbour = grid[rowIndex][columnIndex + 1];
    neighbours.push(rightNeighbour);
  }

  return neighbours.filter((cell) => !cell.wasVisited);
}

function removeWallsBetweenCells(firstCell, secondCell) {
  const sameRow = firstCell.rowIndex === secondCell.rowIndex;
  const secondOnTop = firstCell.rowIndex > secondCell.rowIndex;
  const sameColumn = firstCell.columnIndex === secondCell.columnIndex;
  const firstIsRight = firstCell.columnIndex > secondCell.columnIndex;

  if (sameRow) {
    if (firstIsRight) {
      firstCell.leftWall = false;
      secondCell.rightWall = false;
    } else {
      firstCell.rightWall = false;
      secondCell.leftWall = false;
    }
  }
  if (sameColumn) {
    if (secondOnTop) {
      firstCell.topWall = false;
      secondCell.bottomWall = false;
    } else {
      secondCell.topWall = false;
      firstCell.bottomWall = false;
    }
  }
}

function Cell(columnIndex = 0, rowIndex = 0) {
  this.topWall = true;
  this.bottomWall = true;
  this.leftWall = true;
  this.rightWall = true;
  this.wasVisited = false;
  this.columnIndex = columnIndex;
  this.rowIndex = rowIndex;
}

function createGridStructure(size) {
  let grid = [];
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    let tempRow = [];
    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      const cell = new Cell(columnIndex, rowIndex);
      const $div = createCellElement(cell);
      $(document.body).append($div);
      tempRow.push(cell);
    }
    grid.push(tempRow);
  }
  return grid;
}

function pickRandomElementFromArray(array = []) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// 1. Choose the initial cell, mark it as visited and push it to the stack
// 2. While the stack is not empty
//      A. Pop a cell from the stack and make it a current cell
//      B. If the current cell has any neighbours which have not been visited
//            a. Push the current cell to the stack
//            b. Choose one of the unvisited neighbours
//            c. Remove the wall between the current cell and the chosen cell
//            d. Mark the chosen cell as visited and push it to the stack
