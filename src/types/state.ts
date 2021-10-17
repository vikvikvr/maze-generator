export type UiState = {
  image: {
    blurred: string;
    regular: string;
    loading: boolean;
  };
};

export type AppSettings = {
  gridSize: number;
  stepDelay: number;
};

/**
 * App state.
 */
export type StoreState = {
  ui: UiState;
};
