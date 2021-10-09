import { useMemo, FC, CSSProperties } from 'react';
import classes from './Maze.module.css';
import { Cell, CELL_SIZE } from 'components/Cell';
import { useMaze } from 'hooks';

export const Maze: FC = () => {
  const { grid } = useMaze();

  // TODO: create useStyle shared custom hook
  const mazeStyle: CSSProperties = useMemo(() => {
    return {
      width: grid.length * CELL_SIZE,
      height: grid.length * CELL_SIZE,
    };
  }, [grid.length]);

  return (
    <div className={classes.maze} style={mazeStyle}>
      {grid.flat().map((cell, index) => (
        <Cell cell={cell} key={index} />
      ))}
    </div>
  );
};
