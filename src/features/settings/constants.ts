import { AppSettings } from './types';

export const defaultSettings: AppSettings = {
  gridSize: 5,
  stepDelay: 100,
  infinite: false,
};

export const GRID_SIZE_MIN = 5;
export const GRID_SIZE_MAX = 30;
export const GRID_SIZE_STEP = 5;

export const STEP_DELAY_MIN = 0;
export const STEP_DELAY_MAX = 500;
export const STEP_DELAY_STEP = 100;
