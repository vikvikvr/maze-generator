import { StoreState } from 'types';

export const getMaze = () => (state: StoreState) => state.maze;

export const getImage = () => (state: StoreState) => state.ui.image;

export const getSettings = () => (state: StoreState) => state.settings;
