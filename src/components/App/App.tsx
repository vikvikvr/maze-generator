import { FC } from 'react';
import { Maze } from 'components';
import { useMaze } from 'hooks';
import { MazeStatus, UseMazeOptions } from 'types';

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

  return (
    <div id="app">
      {status === MazeStatus.UNSOLVED ? (
        <div>
          <button onClick={() => start(MAZE_OPTIONS)}>start</button>
        </div>
      ) : (
        <Maze />
      )}
    </div>
  );
};
