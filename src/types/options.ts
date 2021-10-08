import { MazeGrid, MazePosition } from './maze';

export type UpdateFuncOptions = {
  grid: MazeGrid;
  currentRow: number;
  currentColumn: number;
};

export type UpdateFunc = (options: UpdateFuncOptions) => void;

export type SharedMazeOptions = {
  stepDelay?: number;
  startingPosition?: MazePosition;
};

export type SolveMazeOptions = SharedMazeOptions & {
  grid: MazeGrid;
  onUpdate: UpdateFunc;
};

export type UseMazeOptions = SharedMazeOptions & {
  gridSize: number;
};
