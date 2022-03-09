import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ListInputHeadings from './components/ListInputHeadings';
import DropDownOptions from './components/DropDownOptions';
import BasicSelect from './components/Materialtest'



import BotListNav from './components/BotListNav/index';
import Button from './components/Button/index';
import TextInputBox from './components/TextInputBox/index';
import DeleteEntryPopup from './components/DeleteEntryPopup/index'

ReactDOM.render(
  <React.StrictMode>
    <App />


    <div>test</div>
    <BotListNav/>
    <Button/>
    <TextInputBox/>
    <DeleteEntryPopup/>


    <ListInputHeadings/>


    <ListInputHeadings/>

    <BasicSelect/>
    <DropDownOptions/>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
