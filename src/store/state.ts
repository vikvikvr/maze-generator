import { StoreState, MazeStatus } from 'types';

export const DEFAULT_STATE: StoreState = {
  maze: {
    currentPosition: {
      column: 0,
      row: 0,
    },
    grid: [],
    status: MazeStatus.UNSOLVED,
  },
  ui: {
    image: {
      blurred: '',
      regular: '',
    },
  },
  settings: {
    gridSize: 15,
    stepDelay: 0,
  },
};
