import { MazeGrid, MazePosition, MazeStatus } from './maze';
import { actions, thunks } from 'store';

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

export type StoreState = {
  maze: MazeState;
  ui: UiState;
  settings: AppSettings;
};

type Thunks = typeof thunks;

export type ThunkHandler<
  A extends keyof Thunks,
  T extends 'failure' | 'success' | 'request',
> = (state: StoreState, action: ReturnType<typeof thunks[A][T]>) => StoreState;

export type ReducerHandler<A extends keyof typeof actions> = (
  state: StoreState,
  action: ReturnType<typeof actions[A]>,
) => StoreState;
