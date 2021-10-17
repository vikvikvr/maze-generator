export type ImagesState = {
  blurred: string;
  regular: string;
  loading: boolean;
};

export type FetchImageOptions = {
  gridSize: number;
  cellSize: number;
};

export type TImagesContext = {
  images: ImagesState;
  fetchImage: (options: FetchImageOptions) => Promise<void>;
};
