import { MazeGrid, MazePosition, MazeStatus } from './maze';
import * as actions from 'store/actions';

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

export type StoreState = {
  maze: MazeState;
  ui: UiState;
};

export type ReducerHandler<A extends keyof typeof actions> = (
  state: StoreState,
  action: ReturnType<typeof actions[A]>,
) => StoreState;
