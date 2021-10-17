import { ImagesContext } from 'context/images';
import { useContext } from 'react';

export function useImages() {
  return useContext(ImagesContext);
}
