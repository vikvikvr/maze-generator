import { StoreState, MazeStatus } from 'types';

export const DEFAULT_STATE: StoreState = {
  maze: {
    status: MazeStatus.UNSOLVED,
  },
  ui: {
    image: {
      blurred: '',
      regular: '',
      loading: false,
    },
  },
  settings: {
    gridSize: 15,
    stepDelay: 0,
  },
};
