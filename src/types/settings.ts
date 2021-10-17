import { ChangeEvent } from 'react';

export type AppSettings = {
  gridSize: number;
  stepDelay: number;
};

export type TSettingsContext = {
  settings: AppSettings;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
