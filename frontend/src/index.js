import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss'
import reportWebVitals from './reportWebVitals';
import UserSignupPage from './pages/UserSignupPage';
import './i18n'
import LoginPage from './pages/LoginPage';
import LanguageSelector from './component/LanguageSelector';
import ApiProgress from './shared/ApiProgress';
import App from './container/App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App>
      
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
