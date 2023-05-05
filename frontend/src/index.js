import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from "./store/session"
import * as spotActions from "./store/spots"
import { ModalProvider, Modal } from './context/Modal';
const store = configureStore();


if (process.env.NODE_ENV !== "production") {
  window.store = store;
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions
  window.spotActions = spotActions

}

function Root() {
  return (
    <ModalProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </ReduxProvider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
