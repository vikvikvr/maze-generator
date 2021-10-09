import { MazeStatus } from 'types';
import { MazeGrid, MazePosition } from './maze';

export type UpdateFuncOptions = {
  grid: MazeGrid;
  currentRow: number;
  currentColumn: number;
  status: MazeStatus;
};

export type UpdateFunc = (options: UpdateFuncOptions) => void;

export type SharedMazeOptions = {
  stepDelay?: number;
  startingPosition?: MazePosition;
};

export type SolveMazeOptions = SharedMazeOptions & {
  options: SharedMazeOptions & {
    grid: MazeGrid;
  };
  onUpdate: UpdateFunc;
  onDone: () => void;
};

export type UseMazeOptions = SharedMazeOptions & {
  gridSize: number;
};
