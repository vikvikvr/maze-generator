console.log('kostas says hello');
console.log('Dave says hello');

$(async () => {
  await sleep(500);
  let grid = createGridStructure(30);
  makeMaze(grid, (currRow, currCol) => {
    renderGrid(grid, currRow, currCol);
  });
});

function renderGrid(grid, currRow, currColumn) {
  for (let row = currRow - 3; row < currRow + 3; row++) {
    for (let column = currColumn - 3; column < currColumn + 3; column++) {
      try {
        const cell = grid[row][column];
        modifyCellElemnt(cell, false);
      } catch (error) {}
    }
  }
  const cell = grid[currRow][currColumn];
  modifyCellElemnt(cell, true);
}

function modifyCellElemnt(cell, isCurrent) {
  if (!cell.wasVisited) return;
  const { $div } = cell;
  // basic style
  $div.addClass(cell.wasVisited ? 'visited' : '');
  if (isCurrent) {
    $div.addClass('current');
  } else {
    $div.removeClass('current');
  }
  // hides walls
  if (cell.topWall) $div.addClass('top');
  else $div.removeClass('top');
  if (cell.bottomWall) $div.addClass('bottom');
  else $div.removeClass('bottom');
  if (cell.leftWall) $div.addClass('left');
  else $div.removeClass('left');
  if (cell.rightWall) $div.addClass('right');
  else $div.removeClass('right');
}

function createCellElement(cell) {
  const cellSize = 20;
  const left = cell.columnIndex * cellSize;
  const top = cell.rowIndex * cellSize;
  const $div = $('<div>');
  $div.addClass('cell');
  $div.css('left', left);
  $div.css('top', top);
  $div.css('width', cellSize);
  $div.css('height', cellSize);
  $div.css('background-position', `${-left}px ${-top}px`);
  return $div;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function makeMaze(grid, renderCallback) {
  const center = Math.floor(grid.length / 2);
  let currentCell = grid[center][center];
  let pathTaken = [];
  let currentPosition = [0, 0];
  currentCell.wasVisited = true;
  pathTaken.push(currentCell);
  while (pathTaken.length) {
    currentCell = pathTaken.pop();
    currentPosition = [currentCell.rowIndex, currentCell.columnIndex];
    let unvisitedNeighbours = getUnvisitedNeighbours(currentCell, grid);
    if (unvisitedNeighbours.length) {
      pathTaken.push(currentCell);
      let neighbourCell = pickRandomElementFromArray(unvisitedNeighbours);
      removeWallsBetweenCells(currentCell, neighbourCell);
      neighbourCell.wasVisited = true;
      currentPosition = [neighbourCell.rowIndex, neighbourCell.columnIndex];
      pathTaken.push(neighbourCell);
    }
    await sleep(20);
    if (renderCallback) renderCallback(...currentPosition);
  }
}

function getUnvisitedNeighbours(currentCell, grid) {
  const { rowIndex, columnIndex } = currentCell;
  const topExists = rowIndex > 0;
  const bottomExists = rowIndex + 1 < grid.length;
  const leftExists = columnIndex > 0;
  const rightExists = columnIndex + 1 < grid.length;
  const neighbours = [];

  if (topExists) {
    neighbours.push(grid[rowIndex - 1][columnIndex]);
  }

  if (bottomExists) {
    neighbours.push(grid[rowIndex + 1][columnIndex]);
  }

  if (leftExists) {
    neighbours.push(grid[rowIndex][columnIndex - 1]);
  }

  if (rightExists) {
    neighbours.push(grid[rowIndex][columnIndex + 1]);
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
  this.$div = null;
}

function createGridStructure(size) {
  let grid = [];
  const container = $('#maze');
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    let tempRow = [];
    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      const cell = new Cell(columnIndex, rowIndex);
      const $div = createCellElement(cell);
      container.append($div);
      cell.$div = $div;
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
