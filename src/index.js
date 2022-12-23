import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyApp from './App.jsx';
import MyApp2 from './App2.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <MyApp/>
    <MyApp2/>
  </>
  
);

