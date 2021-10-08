import { FC } from 'react';
import { Maze } from 'components';
import { useMaze } from 'hooks';
import { MazeStatus, UseMazeOptions } from 'types';

// TODO: add UI elements to customize maze options
const MAZE_OPTIONS: UseMazeOptions = {
  gridSize: 30,
  stepDelay: 10,
  startingPosition: {
    row: 0,
    column: 0,
  },
};

export const App: FC = () => {
  const { grid, status, start } = useMaze(MAZE_OPTIONS);

  return (
    <div id="app">
      {status === MazeStatus.UNSOLVED ? (
        <div>
          <button onClick={start}>start</button>
        </div>
      ) : (
        <div>
          <Maze grid={grid} />
        </div>
      )}
    </div>
  );
};
