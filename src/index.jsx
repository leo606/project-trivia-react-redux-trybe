import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // REDUX
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store'; // REDUX
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter basename={ process.env.PUBLIC_URL }>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
