import { MazeGrid, MazePosition, MazeStatus } from 'types';

export type UpdateMazePayload = {
  grid: MazeGrid;
  currentRow: number;
  currentColumn: number;
  status: MazeStatus;
};

export type StartMazePayload = {
  grid: MazeGrid;
  startingPosition: MazePosition;
};

export type FetchImageRequestPayload = {
  gridSize: number;
  cellSize: number;
};

export type FetchImageSuccessPayload = {
  regular: string;
  blurred: string;
};
