import { useMemo, FC, CSSProperties } from 'react';
import classes from './Maze.module.css';
import { Cell, CELL_SIZE } from 'components/Cell';
import { useMaze, useUi } from 'hooks';
import { MazeCell } from 'core/MazeCell';
import { MazePosition } from 'types';

function isCurrent(cell: MazeCell, { column, row }: MazePosition) {
  return cell.rowIndex === row && cell.columnIndex === column;
}

export const Maze: FC = () => {
  const { grid, currentPosition } = useMaze();

  const { image } = useUi();

  const imageSize = grid.length * CELL_SIZE;

  const mazeStyle: CSSProperties = useMemo(() => {
    return {
      width: imageSize,
      height: imageSize,
      backgroundImage: `url(${image.regular})`,
      backgroundSize: `${imageSize}px ${imageSize}px`,
    };
  }, [image.regular, imageSize]);

  // TODO: improve performance using canvas

  return (
    <div className={classes.maze} style={mazeStyle}>
      {grid.flat().map((cell, index) => {
        return (
          <Cell
            cell={cell}
            isCurrent={isCurrent(cell, currentPosition)}
            key={index}
          />
        );
      })}
    </div>
  );
};
