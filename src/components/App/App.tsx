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
    backgroundImage: `url(${
      image.blurred || 'https://picsum.photos/1920/1080'
    })`,
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
        <Settings onStart={handleStart} />
      ) : (
        <Maze />
      )}
    </div>
  );
};
