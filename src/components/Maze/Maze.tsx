import { useMemo, FC, CSSProperties, useEffect } from 'react';
import classes from './Maze.module.css';
import { CELL_SIZE, BORDER_WIDTH } from 'shared/constants';
import {
  useDownloadComponent,
  useDrawMaze,
  useMaze,
  useUi,
  useSettings,
} from 'hooks';
import { useHistory } from 'react-router-dom';
import { actions } from 'store';
import { useDispatch } from 'react-redux';

export const Maze: FC = () => {
  const { grid, currentPosition, isDone, start } = useMaze();

  const history = useHistory();

  const dispatch = useDispatch();

  const { image } = useUi();

  const { canvasRef, imageRef, drawMaze } = useDrawMaze({
    grid,
    currentPosition,
    imageSrc: image.regular,
    isDone,
  });

  const { download } = useDownloadComponent(canvasRef);

  const { settings } = useSettings();

  useEffect(() => {
    start(settings);
    dispatch(actions.startMaze());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageSize = grid.length * CELL_SIZE + BORDER_WIDTH * grid.length;

  useEffect(drawMaze, [drawMaze]);

  // hidden: only used to get average color
  const imageStyle = useMemo((): CSSProperties => {
    return {
      width: imageSize,
      height: imageSize,
      backgroundImage: `url(${image.regular})`,
      backgroundSize: `${imageSize}px ${imageSize}px`,
      display: 'none',
    };
  }, [image.regular, imageSize]);

  return (
    <div className={classes.mazeContainer}>
      <canvas ref={canvasRef} width={imageSize} height={imageSize} />
      <img src={image.regular} style={imageStyle} alt="pic" ref={imageRef} />
      <div className={classes.buttonsContainer}>
        <button onClick={() => history.push('/')}>Back</button>
        {isDone && <button onClick={download}>Download</button>}
        {isDone && <button onClick={alert}>Next</button>}
      </div>
    </div>
  );
};
