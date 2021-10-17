import { fetchImages } from 'api/images';
import { createContext, useCallback, useState } from 'react';
import { TImagesContext, ImagesState, FetchImageOptions } from 'types';

export const ImagesContext = createContext<TImagesContext>({
  images: {
    blurred: '',
    regular: '',
    loading: false,
  },
  fetchImage: async () => {},
});

export function useImagesContext(): TImagesContext {
  const [images, setImages] = useState<ImagesState>({
    blurred: '',
    regular: '',
    loading: false,
  });

  const fetchImage = useCallback(async (options: FetchImageOptions) => {
    setImages((images) => ({
      ...images,
      loading: true,
    }));

    const { blurred, regular } = await fetchImages(options);

    setImages({
      blurred,
      regular,
      loading: false,
    });
  }, []);

  return {
    images,
    fetchImage,
  };
}
