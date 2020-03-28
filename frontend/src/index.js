import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//renderizando o app dentro do elemento com id root

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

