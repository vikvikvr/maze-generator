import { API_URL } from './constants';
import { FetchImageOptions } from './types';
import { fetchBase64Image } from 'utils';

export async function fetchImages(options: FetchImageOptions) {
  const imageSize = options.gridSize * options.cellSize;

  const seed = Date.now().valueOf();

  const BASE_URL = `${API_URL}/seed/${seed}`;

  const regularUrl = `${BASE_URL}/${imageSize}/${imageSize}`;

  const blurredUrl = `${BASE_URL}/1920/1080?blur=8`;

  const [regular, blurred] = await Promise.all([
    fetchBase64Image(regularUrl),
    fetchBase64Image(blurredUrl),
  ]);

  return {
    regular,
    blurred,
  };
}
