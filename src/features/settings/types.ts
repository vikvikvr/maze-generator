export type AppSettings = {
  gridSize: number;
  stepDelay: number;
  infinite: boolean;
};

export type TSettingsContext = {
  settings: AppSettings;
  onChange: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K],
  ) => void;
};
