console.log('kostas says hello');
console.log('Dave says hello');

let imageUrl = '';

$(start);

async function start() {
  const gridSize = 30;
  await sleep(500);
  $('#maze').css('width', gridSize * 20);
  $('#maze').css('height', gridSize * 20);
  let grid;
  while (true) {
    const seed = Date.now();
    let response = await fetch(
      `https://picsum.photos/seed/${seed}/${gridSize * 20}/${gridSize * 20}`
    );
    let response2 = await fetch(
      `https://picsum.photos/seed/${seed}/1920/1080?blur=8`
    );
    $(document.body).css('background', `url(${response2.url})`);
    imageUrl = response.url;
    grid = createGridStructure(gridSize);
    await makeMaze(grid, renderGrid);
  }
}

function renderGrid(grid, currRow, currColumn) {
  for (let row = currRow - 3; row < currRow + 3; row++) {
    for (let column = currColumn - 3; column < currColumn + 3; column++) {
      try {
        const cell = grid[row][column];
        modifyCellElement(cell, false);
      } catch (error) {}
    }
  }
  const completion = visitedPercent(grid);
  $('#loader').css('width', `${600 * completion}`);
  const cell = grid[currRow][currColumn];
  modifyCellElement(cell, true);
}

function modifyCellElement(cell, isCurrent) {
  if (!cell.wasVisited) return;
  const { $div } = cell;
  modifyCellBackground($div, cell, isCurrent);
  modifyCellWalls($div, cell);
}

function modifyCellBackground($div, cell, isCurrent) {
  const cellSize = 20;
  const left = cell.columnIndex * cellSize;
  const top = cell.rowIndex * cellSize;
  if (cell.wasVisited) {
    $div.css('background', `rgba(0, 0, 0, 0) url(${imageUrl}`);
    $div.css('background-position', `${-left}px ${-top}px`);
  }
  if (isCurrent) {
    $div.css('background', `rgba(0, 0, 0, 0.5) url(${imageUrl}`);
    $div.css('background-position', `${-left}px ${-top}px`);
  }
}

function modifyCellWalls($div, cell) {
  ['top', 'bottom', 'left', 'right'].forEach((className) => {
    const propName = className + 'Wall';
    if (cell[propName]) $div.addClass(className);
    else $div.removeClass(className);
  });
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
  $div.css('background', `rgba(0, 0, 0, 0.7) url(${imageUrl}`);
  $div.css('background-blend-mode', 'darken');
  $div.css('background-position', `${-left}px ${-top}px`);
  // background: ;
  // background-blend-mode: darken;
  return $div;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

async function makeMaze(grid, renderCallback) {
  return new Promise(async (resolve) => {
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
      await sleep(10);
      if (renderCallback) renderCallback(grid, ...currentPosition);
    }
    resolve();
  });
}

function visitedPercent(grid) {
  let visitedCount = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid.length; column++) {
      if (grid[row][column].wasVisited) visitedCount++;
    }
  }
  return visitedCount / grid.length ** 2;
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
  container.empty();
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
