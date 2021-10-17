import { SettingsContext } from 'context';
import { useContext } from 'react';

export function useSettings() {
  const { onChange, settings } = useContext(SettingsContext);

  return {
    settings,
    onChange,
  };
}
