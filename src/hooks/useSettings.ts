import { ChangeEvent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings, actions } from 'store';
import { AppSettings } from 'types';

export function useSettings() {
  const dispatch = useDispatch();

  const settings = useSelector(getSettings());

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const key = e.target.name as keyof AppSettings;

      dispatch(
        actions.updateSettings({
          ...settings,
          [key]: parseInt(e.target.value),
        }),
      );
    },
    [dispatch, settings],
  );

  return {
    settings,
    onChange,
  };
}
