import { ImagesContext } from '../context';
import { useContext } from 'react';

export function useImages() {
  return useContext(ImagesContext);
}
