import { FC, CSSProperties, useCallback } from 'react';
import { Maze, Settings } from 'components';
import { useUi } from 'hooks';
import classes from './App.module.css';
import { Switch, Route, useHistory } from 'react-router-dom';

export const App: FC = () => {
  const history = useHistory();

  const { image } = useUi();

  const appStyle: CSSProperties = {
    backgroundImage: `url(${image.blurred})`,
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
