import { FC, CSSProperties, useCallback } from 'react';
import { Maze, Settings } from 'components';
import { useUi } from 'hooks';
import classes from './App.module.css';
import { Switch, Route, useHistory } from 'react-router-dom';

export const App: FC = () => {
  const history = useHistory();

  const { fetchImage, image } = useUi();

  const appStyle: CSSProperties = {
    backgroundImage: `url(${
      image.blurred || 'https://picsum.photos/1920/1080'
    })`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleStart = useCallback(() => {
    fetchImage();
    // start(settings);
    history.push('/maze');
  }, [fetchImage, history]);

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
