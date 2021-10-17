import { FC, useEffect } from 'react';
import { PuffLoader } from 'react-spinners';

import { CELL_SIZE, useImages } from 'features/images';
import {
  GRID_SIZE_MAX,
  GRID_SIZE_MIN,
  GRID_SIZE_STEP,
  STEP_DELAY_MAX,
  STEP_DELAY_MIN,
  STEP_DELAY_STEP,
  useSettings,
} from 'features/settings';
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
          min={GRID_SIZE_MIN}
          max={GRID_SIZE_MAX}
          step={GRID_SIZE_STEP}
          onChange={(e) => onChange('gridSize', parseInt(e.target.value))}
        />
      </div>
      <div className={classes.sliderContainer}>
        <label>Step delay</label>
        <input
          type="range"
          name="stepDelay"
          value={settings.stepDelay}
          min={STEP_DELAY_MIN}
          max={STEP_DELAY_MAX}
          step={STEP_DELAY_STEP}
          onChange={(e) => onChange('stepDelay', parseInt(e.target.value))}
        />
      </div>
      <div className={classes.infiniteContainer}>
        <label>Infinite</label>
        <input
          type="checkbox"
          name="stepDelay"
          checked={settings.infinite}
          onChange={(e) => onChange('infinite', e.target.checked)}
        />
      </div>
      <button onClick={onStart} disabled={loading}>
        Start
      </button>
    </div>
  );
};
