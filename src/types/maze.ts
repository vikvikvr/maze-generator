import { MazeCell } from 'core/MazeCell';

export type MazePosition = {
  row: number;
  column: number;
};

export type MazeGrid = MazeCell[][];
