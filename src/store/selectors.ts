import { StoreState } from 'types';

export const getImage = () => (state: StoreState) => state.ui.image;
