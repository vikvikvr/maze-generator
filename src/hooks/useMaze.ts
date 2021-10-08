import { useCallback, useState } from 'react';
import { createMazeGrid, solveMaze } from 'core';
import { MazeGrid, MazePosition, MazeStatus } from 'types/maze';
import { UpdateFunc, UseMazeOptions } from 'types/options';

/**
 * Hook to solve the maze.
 */
export function useMaze({
  gridSize,
  stepDelay,
  startingPosition,
}: UseMazeOptions) {
  const [grid, setGrid] = useState<MazeGrid>(createMazeGrid(gridSize));

  const [status, setStatus] = useState<MazeStatus>(MazeStatus.UNSOLVED);

  const [currentPosition, setCurrentPosition] = useState<MazePosition>({
    row: 0,
    column: 0,
  });

  const onUpdate: UpdateFunc = useCallback(
    ({ grid: newGrid, currentRow, currentColumn }) => {
      setGrid(newGrid);
      setCurrentPosition({ row: currentRow, column: currentColumn });
    },
    [],
  );

  const start = useCallback(async () => {
    setStatus(MazeStatus.SOLVING);
    await solveMaze({ grid, onUpdate, stepDelay, startingPosition });
    setStatus(MazeStatus.SOLVED);
  }, [grid, onUpdate, startingPosition, stepDelay]);

  return {
    grid,
    status,
    currentPosition,
    start,
  };
}
