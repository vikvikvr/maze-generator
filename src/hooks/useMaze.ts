import { useEffect, useState } from 'react';
import { createMazeGrid, solveMazeStep } from 'core';
import { StartMazeOptions } from 'types/options';
import { MazeGrid } from 'types';
import { MazeCell } from 'core/MazeCell';

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

  const update = () => {
    if (!state.visitedCells.length) {
      clearInterval(intervalId);
    }

    if (state.grid.length) {
      state = solveMazeStep(state);

      setStep((step) => step + 1);
    } else {
      console.log('else', state);
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

  useEffect(
    () => () => {
      clearInterval(intervalId);
      state = initialState;
    },
    [],
  );

  return {
    grid: state.grid,
    currentPosition: state.currentPosition,
    start,
  };
}
