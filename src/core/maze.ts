import { MazeGrid, MazePosition } from 'types';
import { pickRandomElementFromArray } from 'utils';
import { MazeCell } from './MazeCell';

type MazeStep = {
  grid: MazeGrid;
  currentPosition: MazePosition;
  visitedCells: MazeCell[];
};

export function solveMazeStep(step: MazeStep): MazeStep {
  const {
    grid: oldGrid,
    currentPosition: oldCurrentPosition,
    visitedCells: oldVisitedCells,
  } = JSON.parse(JSON.stringify(step)) as MazeStep;

  const grid = oldGrid;

  let currentPosition = [oldCurrentPosition.row, oldCurrentPosition.column];

  let currentCell = grid[currentPosition[0]][currentPosition[1]];

  currentCell.wasVisited = true;

  const visitedCells = [...oldVisitedCells];

  if (visitedCells.length) {
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
  }

  return {
    currentPosition: {
      row: currentPosition[0],
      column: currentPosition[1],
    },
    grid,
    visitedCells,
  };
}

/**
 * Retrieves the unvisited neighbour cells.
 */
function getUnvisitedNeighbours(
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
function removeWallsBetweenCells(
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
