import { fetchImages } from './api';
import { createContext, useCallback, useState } from 'react';
import { TImagesContext, ImagesState, FetchImageOptions } from './types';

export const ImagesContext = createContext<TImagesContext>({
  images: {
    blurred: '',
    regular: '',
  },
  loading: false,
  fetchImage: async () => {},
});

export function useImagesContext(): TImagesContext {
  const [images, setImages] = useState<ImagesState>({
    blurred: '',
    regular: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchImage = useCallback(async (options: FetchImageOptions) => {
    setLoading(true);

    const newImages = await fetchImages(options);

    setImages(newImages);
    setLoading(false);
  }, []);

  return {
    images,
    loading,
    fetchImage,
  };
}
