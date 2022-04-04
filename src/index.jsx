import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ListInputHeadings from './components/ListInputHeadings';
import DropDownOptions from './components/DropDownOptions';
import BasicSelect from './components/Materialtest'
import DropdownExampleSimple from './components/DropDownCheckBox'



ReactDOM.render(
  <React.StrictMode>
    <App />

    <ListInputHeadings/>

    <BasicSelect/>
    <DropDownOptions/>
    <DropdownExampleSimple/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
