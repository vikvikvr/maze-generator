import { MazeStatus, ActionHandler, ThunkHandler } from 'types';

export const startMaze: ActionHandler<'startMaze'> = (state, action) => ({
  ...state,
  maze: {
    ...state.maze,
    grid: action.payload.grid,
    status: MazeStatus.SOLVING,
  },
  ui: {
    ...state.ui,
    imageId: Date.now().valueOf().toString(),
  },
});

export const updateMaze: ActionHandler<'updateMaze'> = (state, action) => ({
  ...state,
  maze: action.payload,
});

export const completeMaze: ActionHandler<'completeMaze'> = (state) => ({
  ...state,
  maze: {
    ...state.maze,
    status: MazeStatus.SOLVED,
  },
});

export const setImage: ThunkHandler<'fetchImage', 'success'> = (
  state,
  action,
) => ({
  ...state,
  ui: {
    ...state.ui,
    image: {
      ...action.payload,
    },
  },
});

export const updateSettings: ActionHandler<'updateSettings'> = (
  state,
  action,
) => ({
  ...state,
  settings: {
    ...action.payload,
  },
});
