import { FC, CSSProperties } from 'react';
import { MazeCell } from 'core/MazeCell';
import classes from './Cell.module.css';
import { classNames } from 'utils';

export const CELL_SIZE = 20;

type Props = {
  cell: MazeCell;
};

export const Cell: FC<Props> = ({ cell }) => {
  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.topWall]: cell.topWall,
    [classes.rightWall]: cell.rightWall,
    [classes.bottomWall]: cell.bottomWall,
    [classes.leftWall]: cell.leftWall,
  });

  const style: CSSProperties = {
    left: cell.columnIndex * CELL_SIZE,
    top: cell.rowIndex * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
  };

  // TODO: fix overlapping cell borders

  return <div className={cellClasses} style={style} />;
};
