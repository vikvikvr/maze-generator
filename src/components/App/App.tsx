import { FC, CSSProperties, useCallback } from 'react';
import { Maze, Settings } from 'components';
import { useMaze, useSettings, useUi } from 'hooks';
import { MazeStatus } from 'types';
import classes from './App.module.css';

export const App: FC = () => {
  const { status, start } = useMaze();

  const { settings } = useSettings();

  const { fetchImage, image } = useUi();

  const appStyle: CSSProperties = {
    backgroundImage: `url(${image.blurred})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleStart = useCallback(() => {
    fetchImage();
    start(settings);
  }, [fetchImage, settings, start]);

  return (
    <div id="app" className={classes.app} style={appStyle}>
      {status === MazeStatus.UNSOLVED ? (
        <div>
          <Settings />
          <button onClick={handleStart}>start</button>
          <div>{image.blurred}</div>
        </div>
      ) : (
        <Maze />
      )}
      <div className={classes.appVersion}>v{process.env.REACT_APP_VERSION}</div>
    </div>
  );
};
