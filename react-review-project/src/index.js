import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavouriteContextProvider } from './store/favourite-context'
/*
TODO: 入口
MARK: - 入口
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <FavouriteContextProvider>
  <FavouriteContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavouriteContextProvider>
);
