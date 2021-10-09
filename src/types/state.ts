import { MazeGrid, MazePosition, MazeStatus } from './maze';
import * as actions from 'store/actions';

export type MazeState = {
  grid: MazeGrid;
  status: MazeStatus;
  currentPosition: MazePosition;
};

export type StoreState = {
  maze: MazeState;
};

export type ReducerHandler<A extends keyof typeof actions> = (
  state: StoreState,
  action: ReturnType<typeof actions[A]>,
) => StoreState;
