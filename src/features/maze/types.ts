import { MazeCell } from './maze';

export type MazePosition = {
  row: number;
  column: number;
};

export type MazeGrid = MazeCell[][];

export type SolveMazeOptions = {
  stepDelay: number;
  grid: MazeGrid;
};

export type StartMazeOptions = {
  gridSize: number;
  stepDelay: number;
};
