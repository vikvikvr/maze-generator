import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createMazeGrid, solveMaze } from 'core';
import { UseMazeOptions } from 'types/options';
import { getMaze, actions } from 'store';
import { UpdateMazePayload } from 'types/payloads';

/**
 * Hook to solve the maze.
 */
export function useMaze() {
  const { grid, status, currentPosition } = useSelector(getMaze());

  const dispatch = useDispatch();

  const onUpdate = useCallback(
    (payload: UpdateMazePayload) => {
      dispatch(actions.updateMaze(payload));
    },
    [dispatch],
  );

  const onDone = useCallback(() => {
    dispatch(actions.completeMaze());
  }, [dispatch]);

  const start = useCallback(
    ({
      gridSize,
      stepDelay,
      startingPosition = { row: 0, column: 0 },
    }: UseMazeOptions) => {
      const newGrid = createMazeGrid(gridSize);

      dispatch(actions.startMaze({ grid: newGrid, startingPosition }));

      solveMaze({
        options: { grid: newGrid, stepDelay, startingPosition },
        onUpdate,
        onDone,
      });
    },
    [dispatch, onDone, onUpdate],
  );

  return {
    grid,
    status,
    currentPosition,
    start,
  };
}
