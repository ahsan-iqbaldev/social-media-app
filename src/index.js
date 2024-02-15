import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


// let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

