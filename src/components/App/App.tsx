import { FC, CSSProperties, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { useImages } from 'features/images';
import { Maze, Settings } from 'components';
import classes from './App.module.css';

export const App: FC = () => {
  const history = useHistory();

  const { images } = useImages();

  const appStyle: CSSProperties = {
    backgroundImage: `url(${images.blurred})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleStart = useCallback(() => {
    history.push('/maze');
  }, [history]);

  return (
    <div id="app" className={classes.app} style={appStyle}>
      <Switch>
        <Route path="/" exact>
          <Settings onStart={handleStart} />
        </Route>
        <Route path="/maze" exact>
          <Maze />
        </Route>
      </Switch>
    </div>
  );
};
