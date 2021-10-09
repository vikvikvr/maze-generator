import { FC, CSSProperties } from 'react';
import { Maze } from 'components';
import { useMaze, useUi } from 'hooks';
import { MazeStatus, UseMazeOptions } from 'types';
import classes from './App.module.css';

// TODO: add UI elements to customize maze options
const MAZE_OPTIONS: UseMazeOptions = {
  gridSize: 30,
  stepDelay: 0,
  startingPosition: {
    row: 5,
    column: 6,
  },
};

export const App: FC = () => {
  const { status, start } = useMaze();

  const { imageId } = useUi();

  const backgroundUrl = `https://picsum.photos/seed/${imageId}/1920/1080?blur=8`;

  const appStyle: CSSProperties = {
    background: `url(${backgroundUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div id="app" className={classes.app} style={appStyle}>
      {status === MazeStatus.UNSOLVED ? (
        <div>
          <button onClick={() => start(MAZE_OPTIONS)}>start</button>
        </div>
      ) : (
        <Maze />
      )}
      <div className={classes.appVersion}>v{process.env.REACT_APP_VERSION}</div>
    </div>
  );
};
