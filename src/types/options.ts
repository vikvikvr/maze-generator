import { MazeGrid } from './maze';

export type SolveMazeOptions = {
  stepDelay: number;
  grid: MazeGrid;
};

export type StartMazeOptions = {
  gridSize: number;
  stepDelay: number;
};
