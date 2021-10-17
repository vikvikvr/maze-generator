import { createContext } from 'react';
import { TImagesContext } from './types';

export const ImagesContext = createContext<TImagesContext>({
  images: {
    blurred: '',
    regular: '',
  },
  loading: false,
  fetchImage: async () => {},
});
