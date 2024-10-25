import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
// import reportWebVitals from './reportWebVitals';
import RouterConfig from './routes/root';
import { store } from './store';
import { Provider } from 'react-redux';

import './index.css';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'), {
  /*  onUncaughtError: (error, errorInfo) => {
    console.error('Uncaught error', error, errorInfo.componentStack);
  }, */
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
