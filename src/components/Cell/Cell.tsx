import { FC, CSSProperties, memo } from 'react';
import { MazeCell } from 'core/MazeCell';
import classes from './Cell.module.css';
import { classNames } from 'utils';

// TODO: adapt cell size to gridSize
export const CELL_SIZE = 20;

type Props = {
  cell: MazeCell;
  isCurrent: boolean;
};

export const Cell: FC<Props> = memo(({ cell, isCurrent }) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.topWall]: cell.topWall,
    [classes.rightWall]: cell.rightWall,
    [classes.bottomWall]: cell.bottomWall,
    [classes.leftWall]: cell.leftWall,
  });

  const left = cell.columnIndex * CELL_SIZE;

  const top = cell.rowIndex * CELL_SIZE;

  const cellOpacity = cell.wasVisited ? 0 : 0.5;

  const style: CSSProperties = {
    left,
    top,
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: `rgba(0, 0, 0, ${isCurrent ? 0.3 : cellOpacity})`,
  };

  // TODO: fix overlapping cell borders

  return <div className={cellClasses} style={style} />;
});
