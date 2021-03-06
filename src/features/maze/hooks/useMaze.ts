import { useCallback, useEffect, useState } from 'react';
import { createMazeGrid, solveMazeStep, MazeCell } from '../maze';
import { MazeGrid, StartMazeOptions } from '../types';

const initialState = {
  currentPosition: {
    row: 0,
    column: 0,
  },
  grid: [] as MazeGrid,
  visitedCells: [] as MazeCell[],
};

let state = initialState;

let intervalId: any;

/**
 * Hook to solve the maze.
 */
export function useMaze() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState(0);

  const isDone = state.grid.length
    ? state.grid.flat().every((cell) => cell.wasVisited === true) &&
      state.currentPosition.column === 0 &&
      state.currentPosition.row === 0
    : false;

  const update = () => {
    if (!state.visitedCells.length) {
      clearInterval(intervalId);
    }

    if (state.grid.length) {
      state = solveMazeStep(state);

      setStep((step) => step + 1);
    }
  };

  const start = ({ gridSize, stepDelay }: StartMazeOptions) => {
    const newGrid = createMazeGrid(gridSize);

    newGrid[0][0].wasVisited = true;

    state.grid = newGrid;
    state.visitedCells = [newGrid[0][0]];

    setStep((step) => step + 1);

    intervalId = setInterval(() => update(), stepDelay);
  };

  const resetOnOnmount = useCallback(
    () => () => {
      clearInterval(intervalId);
      state = initialState;
    },
    [],
  );

  useEffect(resetOnOnmount, [resetOnOnmount]);

  return {
    grid: state.grid,
    currentPosition: state.currentPosition,
    isDone,
    start,
  };
}
