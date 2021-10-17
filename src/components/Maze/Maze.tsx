import { useMemo, FC, CSSProperties, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useDrawMaze, useMaze } from 'features/maze';
import { useSettings } from 'features/settings';
import classes from './Maze.module.css';
import {
  BORDER_WIDTH,
  CELL_SIZE,
  useDownloadComponent,
  useImages,
} from 'features/images';

export const Maze: FC = () => {
  const { grid, currentPosition, isDone, start } = useMaze();

  const history = useHistory();

  const { images, fetchImage, loading } = useImages();

  const { canvasRef, imageRef, drawMaze } = useDrawMaze({
    grid,
    currentPosition,
    imageSrc: images.regular,
    isDone,
  });

  const { download } = useDownloadComponent(canvasRef);

  const { settings } = useSettings();

  useEffect(() => {
    start(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNext = useCallback(async () => {
    await fetchImage({
      cellSize: CELL_SIZE,
      gridSize: settings.gridSize,
    });
    start(settings);
  }, [fetchImage, settings, start]);

  const imageSize = grid.length * CELL_SIZE + BORDER_WIDTH * grid.length;

  useEffect(drawMaze, [drawMaze]);

  // hidden: only used to get average color
  const imageStyle = useMemo((): CSSProperties => {
    return {
      width: imageSize,
      height: imageSize,
      backgroundImage: `url(${images.regular})`,
      backgroundSize: `${imageSize}px ${imageSize}px`,
      display: 'none',
    };
  }, [images.regular, imageSize]);

  return (
    <div className={classes.mazeContainer}>
      <canvas
        className={classes.mazeCanvas}
        ref={canvasRef}
        width={imageSize}
        height={imageSize}
      />
      <img src={images.regular} style={imageStyle} alt="pic" ref={imageRef} />
      <div className={classes.buttonsContainer}>
        <button onClick={() => history.push('/')} disabled={loading}>
          Back
        </button>
        {isDone && (
          <button onClick={download} disabled={loading}>
            Download
          </button>
        )}
        {isDone && (
          <button onClick={startNext} disabled={loading}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
