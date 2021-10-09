import { StoreState } from 'types';

export const getMaze = () => (state: StoreState) => state.maze;

export const getImageId = () => (state: StoreState) => state.ui.imageId;
