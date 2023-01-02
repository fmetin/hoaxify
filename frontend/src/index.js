import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap-override.scss';
import App from './container/App';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import AuthenticationContext from './shared/AuthenticationContext';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore'



const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
