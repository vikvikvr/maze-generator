import { MazeStatus, ReducerHandler } from 'types';

export const startMaze: ReducerHandler<'startMaze'> = (state, action) => ({
  ...state,
  maze: {
    ...state.maze,
    grid: action.payload.grid,
    currentPosition: action.payload.startingPosition,
    status: MazeStatus.SOLVING,
  },
});

export const updateMaze: ReducerHandler<'updateMaze'> = (state, action) => ({
  ...state,
  maze: {
    grid: action.payload.grid,
    currentPosition: {
      row: action.payload.currentRow,
      column: action.payload.currentColumn,
    },
    status: action.payload.status,
  },
});

export const completeMaze: ReducerHandler<'completeMaze'> = (state) => ({
  ...state,
  maze: {
    ...state.maze,
    status: MazeStatus.SOLVED,
  },
});
