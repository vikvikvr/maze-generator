import { FC, CSSProperties } from 'react';
import { Maze } from 'components';
import { useMaze, useUi } from 'hooks';
import { MazeStatus, UseMazeOptions } from 'types';
import classes from './App.module.css';

// TODO: add UI elements to customize maze options
export const MAZE_OPTIONS: UseMazeOptions = {
  gridSize: 30,
  stepDelay: 10,
  startingPosition: {
    row: 5,
    column: 6,
  },
};

export const App: FC = () => {
  const { status, start } = useMaze();

  const { fetchImage, image } = useUi();

  const appStyle: CSSProperties = {
    background: `url(${image.blurred})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div id="app" className={classes.app} style={appStyle}>
      {status === MazeStatus.UNSOLVED ? (
        <div>
          <button onClick={fetchImage}>fetch image</button>
          <button onClick={() => start(MAZE_OPTIONS)}>start</button>
          <div>{image.blurred}</div>
        </div>
      ) : (
        <Maze />
      )}
      <div className={classes.appVersion}>v{process.env.REACT_APP_VERSION}</div>
    </div>
  );
};
