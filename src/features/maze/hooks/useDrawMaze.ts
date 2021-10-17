import { useMemo, useRef, useCallback } from 'react';
import { CELL_SIZE } from 'features/images';
import { getAverageRGB } from 'utils';
import { MazeGrid, MazePosition } from '../types';

const BORDER_WIDTH = 2;

type Options = {
  grid: MazeGrid;
  currentPosition: MazePosition;
  imageSrc: string; // image.regular
  isDone: boolean;
};

export function useDrawMaze({
  grid,
  currentPosition,
  imageSrc,
  isDone,
}: Options) {
  const imageRef = useRef<HTMLImageElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const c = canvasRef?.current?.getContext('2d') || null;

  const imageSize = grid.length * CELL_SIZE + BORDER_WIDTH * grid.length;

  const isImageLight = useMemo(() => {
    const averageColor = imageRef.current ? getAverageRGB(imageRef.current) : 0;

    return averageColor > 125;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef.current]);

  const img = useMemo(() => {
    const myImage = new Image();
    myImage.src = imageSrc;
    return myImage;
  }, [imageSrc]);

  const drawMaze = useCallback(() => {
    if (!c) {
      return;
    }

    c.globalAlpha = 1;

    c.drawImage(img, 0, 0, imageSize, imageSize);

    // outer frame
    c.fillStyle = isImageLight ? 'black' : 'white';

    c.fillRect(0, 0, BORDER_WIDTH, imageSize);
    c.fillRect(0, 0, imageSize, BORDER_WIDTH);
    c.fillRect(imageSize - BORDER_WIDTH, 0, imageSize, imageSize);
    c.fillRect(0, imageSize - BORDER_WIDTH, imageSize, imageSize);

    // markers
    if (isDone) {
      c.globalAlpha = 0.5;
      c.fillRect(0, 0, CELL_SIZE + BORDER_WIDTH, CELL_SIZE + BORDER_WIDTH);
      c.fillRect(
        imageSize - BORDER_WIDTH - CELL_SIZE,
        imageSize - BORDER_WIDTH - CELL_SIZE,
        imageSize,
        imageSize,
      );
    }

    // cell overalys
    c.globalAlpha = 0.5;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (!grid[i][j].wasVisited) {
          c.fillRect(
            j * (BORDER_WIDTH + CELL_SIZE),
            i * (BORDER_WIDTH + CELL_SIZE),
            CELL_SIZE + BORDER_WIDTH,
            CELL_SIZE + BORDER_WIDTH,
          );
        }
      }
    }

    c.globalAlpha = 1;

    // right cell walls
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length - 1; j++) {
        if (grid[i][j].rightWall) {
          const left = BORDER_WIDTH + (j + 1) * CELL_SIZE + j * BORDER_WIDTH;
          const top = i * (BORDER_WIDTH + CELL_SIZE);
          c.fillRect(left, top, BORDER_WIDTH, CELL_SIZE + 2 * BORDER_WIDTH);
        }
      }
    }

    // bottom cell walls
    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j].bottomWall) {
          const left = j * (BORDER_WIDTH + CELL_SIZE);
          const top = (i + 1) * (BORDER_WIDTH + CELL_SIZE);
          c.fillRect(left, top, CELL_SIZE + 2 * BORDER_WIDTH, BORDER_WIDTH);
        }
      }
    }

    // current cell
    c.globalAlpha = 0.8;

    c.fillRect(
      BORDER_WIDTH + currentPosition.column * (BORDER_WIDTH + CELL_SIZE),
      BORDER_WIDTH + currentPosition.row * (BORDER_WIDTH + CELL_SIZE),
      CELL_SIZE,
      CELL_SIZE,
    );
  }, [
    c,
    currentPosition.column,
    currentPosition.row,
    grid,
    imageSize,
    img,
    isDone,
    isImageLight,
  ]);

  return {
    imageRef,
    canvasRef,
    drawMaze,
  };
}
