import { MazeStatus } from './maze';

export type MazeState = {
  status: MazeStatus;
};

export type UiState = {
  image: {
    blurred: string;
    regular: string;
    loading: boolean;
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
