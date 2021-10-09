import { MazeGrid, MazeStatus, SolveMazeOptions } from 'types';
import { pickRandomElementFromArray, sleep } from 'utils';
import { MazeCell } from './MazeCell';

/**
 * Solves a maze grid asynchronously.
 */
export async function solveMaze({
  options,
  onUpdate,
  onDone,
}: SolveMazeOptions): Promise<void> {
  const { grid: storeGrid, startingPosition, stepDelay } = options;

  const grid = JSON.parse(JSON.stringify(storeGrid));

  const center = Math.floor(grid.length / 2);
  // TODO: make starting cell random on the border of the maze
  let currentCell = grid[center][center];

  if (startingPosition) {
    currentCell = grid[startingPosition.row][startingPosition.column];
  }

  let currentPosition = [currentCell.rowIndex, currentCell.columnIndex];

  const visitedCells = [currentCell];
  currentCell.wasVisited = true;

  while (visitedCells.length) {
    currentCell = visitedCells.pop() as MazeCell;
    currentPosition = [currentCell.rowIndex, currentCell.columnIndex];
    const unvisitedNeighbours = getUnvisitedNeighbours(currentCell, grid);

    if (unvisitedNeighbours.length) {
      visitedCells.push(currentCell);
      let neighbourCell = pickRandomElementFromArray(unvisitedNeighbours);
      removeWallsBetweenCells(currentCell, neighbourCell);
      neighbourCell.wasVisited = true;
      currentPosition = [neighbourCell.rowIndex, neighbourCell.columnIndex];
      visitedCells.push(neighbourCell);
    }

    if (stepDelay) {
      await sleep(stepDelay);
    }

    onUpdate({
      grid,
      currentRow: currentPosition[0],
      currentColumn: currentPosition[1],
      status: MazeStatus.SOLVING,
    });
  }

  onDone();
}

/**
 * Retrieves the unvisited neighbour cells.
 */
export function getUnvisitedNeighbours(
  currentCell: MazeCell,
  grid: MazeGrid,
): MazeCell[] {
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

/**
 * Removes the shared walls between two maze cells.
 */
export function removeWallsBetweenCells(
  firstCell: MazeCell,
  secondCell: MazeCell,
): void {
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

/**
 * Creates a maze grid of maze cells.
 */
export function createMazeGrid(size: number): MazeGrid {
  const grid = [];

  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const tempRow = [];

    for (let columnIndex = 0; columnIndex < size; columnIndex++) {
      const cell = new MazeCell(columnIndex, rowIndex);
      tempRow.push(cell);
    }

    grid.push(tempRow);
  }

  return grid;
}

// TODO: add cell background
// function modifyCellBackground($div, cell, isCurrent) {
//   const cellSize = 20;
//   const left = cell.columnIndex * cellSize;
//   const top = cell.rowIndex * cellSize;
//   if (cell.wasVisited) {
//     $div.css('background', `rgba(0, 0, 0, 0) url(${imageUrl}`);
//     $div.css('background-position', `${-left}px ${-top}px`);
//   }
//   if (isCurrent) {
//     $div.css('background', `rgba(0, 0, 0, 0.5) url(${imageUrl}`);
//     $div.css('background-position', `${-left}px ${-top}px`);
//   }
// }
