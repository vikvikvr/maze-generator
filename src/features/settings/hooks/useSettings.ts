import { SettingsContext } from '../context';
import { useContext } from 'react';

export function useSettings() {
  return useContext(SettingsContext);
}
