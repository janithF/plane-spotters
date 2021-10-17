import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from './store/app-context';
import { ModalContextProvider } from './store/modal-context';

ReactDOM.render(
  <React.StrictMode>
    <ModalContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
    </ModalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
