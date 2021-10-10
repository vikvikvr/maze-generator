import { MazeStatus, ActionHandler, ThunkHandler } from 'types';

export const startMaze: ActionHandler<'startMaze'> = (state) => ({
  ...state,
  maze: {
    status: MazeStatus.SOLVING,
  },
  ui: {
    ...state.ui,
    imageId: Date.now().valueOf().toString(),
  },
});

export const resetMaze: ActionHandler<'resetMaze'> = (state) => ({
  ...state,
  maze: {
    status: MazeStatus.UNSOLVED,
  },
});

export const completeMaze: ActionHandler<'completeMaze'> = (state) => ({
  ...state,
  maze: {
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
