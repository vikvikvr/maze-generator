import { MazeGrid, MazePosition, MazeStatus } from './maze';

export type MazeState = {
  grid: MazeGrid;
  status: MazeStatus;
  currentPosition: MazePosition;
};

export type UiState = {
  image: {
    blurred: string;
    regular: string;
  };
};

export type AppSettings = {
  gridSize: number;
  stepDelay: number;
};

/**
 * App state.
 */
export type StoreState = {
  maze: MazeState;
  ui: UiState;
  settings: AppSettings;
};
