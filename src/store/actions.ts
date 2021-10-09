import { AppSettings, StartMazePayload, UpdateMazePayload } from 'types';
import { createAction } from 'typesafe-actions';

export const startMaze = createAction('maze/START')<StartMazePayload>();

export const updateMaze = createAction('maze/UPDATE')<UpdateMazePayload>();

export const completeMaze = createAction('maze/COMPLETE')<void>();

export const resetMaze = createAction('maze/RESET')<void>();

export const updateSettings = createAction('settings/UPDATE')<AppSettings>();
