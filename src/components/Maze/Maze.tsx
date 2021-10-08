import { useMemo, FC, CSSProperties } from 'react';
import classes from './Maze.module.css';
import { MazeGrid } from 'types';
import { Cell, CELL_SIZE } from 'components/Cell';

type Props = {
  grid: MazeGrid;
};

export const Maze: FC<Props> = ({ grid }) => {
  const style: CSSProperties = useMemo(() => {
    return {
      width: grid.length * CELL_SIZE,
      height: grid.length * CELL_SIZE,
    };
  }, [grid.length]);

  return (
    <div className={classes.maze} style={style}>
      {grid.flat().map((cell, index) => (
        <Cell cell={cell} key={index} />
      ))}
    </div>
  );
};
