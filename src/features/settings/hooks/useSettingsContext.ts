import { useCallback, useState } from 'react';
import { defaultSettings } from '../constants';
import { AppSettings, TSettingsContext } from '../types';

export function useSettingsContext(): TSettingsContext {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  const onChange = useCallback(
    <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      setSettings({
        ...settings,
        [key]: value,
      });
    },
    [settings],
  );

  return {
    settings,
    onChange,
  };
}
