import { ChangeEvent, createContext, useCallback, useState } from 'react';
import { AppSettings, TSettingsContext } from 'types';

export const SettingsContext = createContext<TSettingsContext>({
  settings: {
    gridSize: 10,
    stepDelay: 10,
  },
  onChange: (e: ChangeEvent<HTMLInputElement>) => {},
});

export function useSettingsContext(): TSettingsContext {
  const [settings, setSettings] = useState<AppSettings>({
    gridSize: 15,
    stepDelay: 0,
  });

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const key = e.target.name as keyof AppSettings;

      setSettings({
        ...settings,
        [key]: parseInt(e.target.value),
      });
    },
    [settings],
  );

  return {
    settings,
    onChange,
  };
}
