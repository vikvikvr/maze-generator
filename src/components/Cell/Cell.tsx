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

  const { grid } = useMaze();

  const cellClasses = classNames({
    [classes.cell]: true,
    [classes.topWall]: cell.topWall,
    [classes.rightWall]: cell.rightWall,
    [classes.bottomWall]: cell.bottomWall,
    [classes.leftWall]: cell.leftWall,
  });

  const gridSize = grid.length;

  // TODO: replace withe new image from state
  const imageId = 42;

  const GET_IMAGE_URL = 'https://picsum.photos/seed';
  const imageUrl = `${GET_IMAGE_URL}/${imageId}/${gridSize * 20}/${
    gridSize * 20
  }`;

  const left = cell.columnIndex * CELL_SIZE;

  const top = cell.rowIndex * CELL_SIZE;

  const style: CSSProperties = {
    left,
    top,
    width: CELL_SIZE,
    height: CELL_SIZE,
    background: `rgba(0, 0, 0, 0) url(${imageUrl}`,
    backgroundPosition: `${-left}px ${-top}px`,
  };

  // TODO: fix overlapping cell borders

  return <div className={cellClasses} style={style} />;
};
