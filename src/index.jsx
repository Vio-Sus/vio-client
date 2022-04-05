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
import NavBarLogin from './components/NavBarLogIn/index'

import Footer from './components/Footer/index'
import LogOut from './components/LogOut/index'
import SubAccountPopUp from './components/SubAccountPopUp'

import ContactsListDetailPopup from './components/ContactsListDetailPopup/index';
import EditContactPopup from './components/EditContactPopup';
import GraphRightSideKey from './components/GraphRightSideKey';
import GraphLeftSideFilter from './components/GraphLeftSideFilter';

import DeleteContactPopup from './components/DeleteContactPopup';
import DeleteMultipleEntries from './components/DeleteMultipleEntries';
import AllButton from './components/AllButton';
import ListInputData from './components/ListInputData'
import ContactInputHeadings from './components/ContactInputHeadings'
import ContactInputData from './components/ContactInputData'




ReactDOM.render(
  <React.StrictMode>
    <App />
  
    {/* //alicia */}
     <BotListNav/>
    <Button/>
    <TextInputBox/> 
    <ContactsListDetailPopup/>
    <EditContactPopup/>
    <GraphLeftSideFilter/>
    <GraphRightSideKey/>

    {/* Jurgen */}
    <DeleteEntryPopup/>
    <DeleteContactPopup/>
    <DeleteMultipleEntries/>
    <AllButton/>

    {/* Min */}
    <BasicSelect/>
    <DropDownOptions/>
    <SubAccountPopUp/>
    <SubAccountPopUp text="Edit"/>

    {/* Jess  */}
    <NavBarLogin/>
    <Footer/>
    <LogOut/>
    <ListInputHeadings/>
    <ListInputData/>
    <ContactInputHeadings/>
    <ContactInputData/>

    {/* Catherine */}
   
    


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
