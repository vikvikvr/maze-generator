export type ImagesState = {
  blurred: string;
  regular: string;
};

export type FetchImageOptions = {
  gridSize: number;
  cellSize: number;
};

export type TImagesContext = {
  images: ImagesState;
  loading: boolean;
  fetchImage: (options: FetchImageOptions) => Promise<void>;
};
