import { MazeGrid, MazePosition, MazeStatus } from 'types';

export type UpdateMazePayload = {
  grid: MazeGrid;
  currentPosition: MazePosition;
  status: MazeStatus;
};

export type StartMazePayload = {
  grid: MazeGrid;
};

export type FetchImageRequestPayload = {
  gridSize: number;
  cellSize: number;
};

export type FetchImageSuccessPayload = {
  regular: string;
  blurred: string;
};
