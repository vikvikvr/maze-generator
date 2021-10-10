import { useMemo, FC, CSSProperties, useEffect } from 'react';
import classes from './Maze.module.css';
import { Cell, CELL_SIZE } from 'components/Cell';
import { useDownloadComponent, useMaze, useSettings, useUi } from 'hooks';
import { MazeCell } from 'core/MazeCell';
import { MazePosition } from 'types';
import { useHistory } from 'react-router-dom';
import { actions } from 'store';
import { useDispatch } from 'react-redux';

function isCurrent(cell: MazeCell, { column, row }: MazePosition) {
  return cell.rowIndex === row && cell.columnIndex === column;
}

export const Maze: FC = () => {
  const { grid, currentPosition, start } = useMaze();

  const { ref, download } = useDownloadComponent<HTMLDivElement>();

  const history = useHistory();

  const dispatch = useDispatch();

  const { image } = useUi();

  const { settings } = useSettings();

  useEffect(() => {
    start(settings);
    dispatch(actions.startMaze());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDone =
    !!grid.length && grid.flat().every(({ wasVisited }) => wasVisited === true);

  useEffect(() => {
    if (isDone) {
      dispatch(actions.completeMaze());
    }
  }, [dispatch, isDone]);

  const mazeStyle: CSSProperties = useMemo(() => {
    const imageSize = grid.length * CELL_SIZE;

    return {
      width: imageSize,
      height: imageSize,
      backgroundImage: `url(${image.regular})`,
      backgroundSize: `${imageSize}px ${imageSize}px`,
    };
  }, [grid.length, image.regular]);

  const sharedMarkersStyle: CSSProperties = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    position: 'absolute',
    cursor: 'pointer',
    backgroundColor: 'black',
    opacity: 0.5,
  };

  const entranceStyle: CSSProperties = {
    ...sharedMarkersStyle,
    left: 0,
    top: 0,
  };

  const exitStyle: CSSProperties = {
    ...sharedMarkersStyle,
    right: 0,
    bottom: 0,
  };

  return (
    <div className={classes.mazeContainer}>
      <div className={classes.maze} style={mazeStyle} ref={ref}>
        {grid.flat().map((cell, index) => (
          <Cell
            cell={cell}
            isCurrent={isCurrent(cell, currentPosition)}
            mazeDone={isDone}
            key={index}
          />
        ))}
        {isDone && <div style={entranceStyle} title="Entrance" />}
        {isDone && <div style={exitStyle} title="Exit" />}
      </div>
      <button onClick={() => history.push('/')} className={classes.backButton}>
        Back
      </button>
      {isDone && <button onClick={download}>Download</button>}
    </div>
  );
};
