import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path='/*' 
          element={
            <Provider store={store}>
              <App />
            </Provider>
            } 
      />
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);

