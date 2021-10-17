import { FC, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';

import { CELL_SIZE, useImages } from 'features/images';
import { useSettings } from 'features/settings';
import classes from './Settings.module.css';

type Props = {
  onStart: () => void;
};

// TODO: show settings preview

// TODO: add setting to choose image category
export const Settings: FC<Props> = ({ onStart }) => {
  const { onChange, settings } = useSettings();

  const { images, loading, fetchImage } = useImages();

  useEffect(() => {
    fetchImage({
      cellSize: CELL_SIZE,
      gridSize: settings.gridSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <PuffLoader color={images.regular ? undefined : 'white'} />;
  }

  return (
    <div className={classes.settings}>
      <header className={classes.header}>
        <h1>Maze generator</h1>
        <div className={classes.appVersion}>
          v{process.env.REACT_APP_VERSION}
        </div>
      </header>
      <div className={classes.sliderContainer}>
        <label>Grid size</label>
        <input
          type="range"
          name="gridSize"
          value={settings.gridSize}
          min={5}
          max={30}
          step={5}
          onChange={onChange}
        />
      </div>
      <div className={classes.sliderContainer}>
        <label>Step delay</label>
        <input
          type="range"
          name="stepDelay"
          value={settings.stepDelay}
          min={0}
          max={500}
          step={20}
          onChange={onChange}
        />
      </div>
      <button onClick={onStart} disabled={loading}>
        Start
      </button>
    </div>
  );
};
