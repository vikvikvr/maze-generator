import { FC } from 'react';
import { useSettings } from 'hooks';
import classes from './Settings.module.css';

// TODO: add setting to choose image category
export const Settings: FC = () => {
  const { settings, onChange } = useSettings();
  return (
    <div>
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
    </div>
  );
};
