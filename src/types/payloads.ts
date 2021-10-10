export type FetchImageRequestPayload = {
  gridSize: number;
  cellSize: number;
};

export type FetchImageSuccessPayload = {
  regular: string;
  blurred: string;
};
