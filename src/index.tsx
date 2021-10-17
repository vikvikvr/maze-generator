import { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from 'features/shared';

render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);
