import { createContext } from 'react';
import { defaultSettings } from './constants';
import { TSettingsContext } from './types';

export const SettingsContext = createContext<TSettingsContext>({
  settings: defaultSettings,
  onChange: () => {},
});
