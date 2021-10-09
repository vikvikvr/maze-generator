import { FC, CSSProperties } from 'react';
import { MazeCell } from 'core/MazeCell';
import classes from './Cell.module.css';
import { classNames } from 'utils';
import { useUi, useMaze } from 'hooks';

export const CELL_SIZE = 20;

type Props = {
  cell: MazeCell;
};

export const Cell: FC<Props> = ({ cell }) => {
  // const { imageId } = useUi();

  const { grid, currentPosition } = useMaze();

  const { image } = useUi();

  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.topWall]: cell.topWall,
    [classes.rightWall]: cell.rightWall,
    [classes.bottomWall]: cell.bottomWall,
    [classes.leftWall]: cell.leftWall,
  });

  const gridSize = grid.length;

  const isCurrentRow = cell.rowIndex === currentPosition.row;

  const isCurrentColumn = cell.columnIndex === currentPosition.column;

  const isCurrent = isCurrentRow && isCurrentColumn;

  const left = cell.columnIndex * CELL_SIZE;

  const top = cell.rowIndex * CELL_SIZE;

  const cellOpacity = cell.wasVisited ? 1 : 0.5;

  const style: CSSProperties = {
    left,
    top,
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundImage: `url(${image.regular})`,
    backgroundPosition: `${-left}px ${-top}px`,
    opacity: isCurrent ? 0.3 : cellOpacity,
    backgroundSize: gridSize * CELL_SIZE,
  };

  // TODO: fix overlapping cell borders

  return <div className={cellClasses} style={style} />;
};
