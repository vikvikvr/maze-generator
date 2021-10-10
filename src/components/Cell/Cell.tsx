import { FC, CSSProperties, memo } from 'react';
import { MazeCell } from 'core/MazeCell';
import classes from './Cell.module.css';
import { classNames } from 'utils';

// TODO: adapt cell size to gridSize
export const CELL_SIZE = 20;

type Props = {
  cell: MazeCell;
  isCurrent: boolean;
  mazeDone: boolean;
};

export const Cell: FC<Props> = memo(({ cell, isCurrent, mazeDone }) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.topWall]: cell.topWall,
    [classes.rightWall]: cell.rightWall,
    [classes.bottomWall]: cell.bottomWall,
    [classes.leftWall]: cell.leftWall,
  });

  let cellOpacity = cell.wasVisited ? 0 : 0.5;

  if (isCurrent && !mazeDone) {
    cellOpacity = 0.3;
  }

  const style: CSSProperties = {
    left: cell.columnIndex * CELL_SIZE,
    top: cell.rowIndex * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: `rgba(0, 0, 0, ${cellOpacity})`,
  };

  return <div className={cellClasses} style={style} />;
});
