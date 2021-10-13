import { FC, CSSProperties, memo } from 'react';
import { MazeCell } from 'core/MazeCell';
import classes from './Cell.module.css';

// TODO: adapt cell size to gridSize
export const CELL_SIZE = 20;

type Props = {
  cell: MazeCell;
  isCurrent: boolean;
  mazeDone: boolean;
  isImageLight: boolean;
};

export const Cell: FC<Props> = memo(
  ({ cell, isCurrent, mazeDone, isImageLight }) => {
    let cellOpacity = cell.wasVisited ? 0 : 0.5;

    if (isCurrent && !mazeDone) {
      cellOpacity = 0.3;
    }

    const wallColor = isImageLight ? 'black' : 'white';

    const borderStyle = `1px solid ${wallColor}`;

    const style: CSSProperties = {
      left: cell.columnIndex * CELL_SIZE,
      top: cell.rowIndex * CELL_SIZE,
      width: CELL_SIZE,
      height: CELL_SIZE,
      backgroundColor: `rgba(0, 0, 0, ${cellOpacity})`,
      borderTop: cell.topWall ? borderStyle : '',
      borderLeft: cell.leftWall ? borderStyle : '',
      borderBottom: cell.bottomWall ? borderStyle : '',
      borderRight: cell.rightWall ? borderStyle : '',
    };

    return <div className={classes.cell} style={style} />;
  },
);
