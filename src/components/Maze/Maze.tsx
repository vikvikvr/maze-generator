import { useMemo, FC, CSSProperties } from 'react';
import classes from './Maze.module.css';
import { Cell, CELL_SIZE } from 'components/Cell';
import { useMaze } from 'hooks';

export const Maze: FC = () => {
  const { grid } = useMaze();

  const style: CSSProperties = useMemo(() => {
    const seed = Date.now();
    const GET_IMAGE_URL = 'https://picsum.photos/seed/';
    const urlSmall = `${GET_IMAGE_URL}${seed}/${CELL_SIZE * 20}/${
      CELL_SIZE * 20
    }`;

    //   $div.css('background', `rgba(0, 0, 0, 0) url(${imageUrl}`);
    //   $div.css('background-position', `${-left}px ${-top}px`);
    // }
    // if (isCurrent) {
    //   $div.css('background', `rgba(0, 0, 0, 0.5) url(${imageUrl}`);
    //   $div.css('background-position', `${-left}px ${-top}px`);

    console.log({ urlSmall });

    return {
      width: grid.length * CELL_SIZE,
      height: grid.length * CELL_SIZE,
      // backgroundImage: `url('${urlSmall}')`,
      // backgroundSize: ''
    };
  }, [grid.length]);

  return (
    <div className={classes.maze} style={style}>
      {grid.flat().map((cell, index) => (
        <Cell cell={cell} key={index} />
      ))}
    </div>
  );
};
