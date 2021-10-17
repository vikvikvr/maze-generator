import { FC, ReactElement } from 'react';

import { SettingsContext, useSettingsContext } from '../settings';
import { ImagesContext, useImagesContext } from '../images';

type Props = {
  children: ReactElement;
};

export const ContextProvider: FC<Props> = ({ children }) => {
  const settingsCtx = useSettingsContext();

  const imagesCtx = useImagesContext();

  return (
    <SettingsContext.Provider value={settingsCtx}>
      <ImagesContext.Provider value={imagesCtx}>
        {children}
      </ImagesContext.Provider>
    </SettingsContext.Provider>
  );
};
