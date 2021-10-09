import { useMemo, FC, CSSProperties, useEffect } from 'react';
import classes from './Maze.module.css';
import { Cell, CELL_SIZE } from 'components/Cell';
import { useMaze, useSettings, useUi } from 'hooks';
import { MazeCell } from 'core/MazeCell';
import { MazePosition } from 'types';
import { useHistory } from 'react-router-dom';

function isCurrent(cell: MazeCell, { column, row }: MazePosition) {
  return cell.rowIndex === row && cell.columnIndex === column;
}

export const Maze: FC = () => {
  const { grid, currentPosition, start } = useMaze();

  const history = useHistory();

  const { image } = useUi();

  const { settings } = useSettings();

  useEffect(() => {
    start(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className={classes.mazeContainer}>
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
      <button onClick={() => history.push('/')} className={classes.backButton}>
        Back
      </button>
    </div>
  );
};
