import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getCollectors, getItems, getLoggedInUser } from './common/network';
import LoginButton from './components/LoginButton';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewEntryPage from './Pages/NewEntry';
import ViewDataPage from './Pages/ViewData';
import ViewSourcePage from './Pages/ViewSource';
import ViewItemPage from './Pages/ViewItem';
import ViewGraphPage from './Pages/ViewGraph';
import ViewSourceGraphPage from './Pages/ViewSourceGraph';
import BluetoothPage from './Pages/Bluetooth';
import AccountTypePage from './Pages/AccountType';
import ViewSourceDataPage from './Pages/ViewSourceData';
import UpdateProfilePage from './Pages/UpdateProfile';

import NavBarLogIn from './components/NavBarLogIn';
import { NavigateBeforeTwoTone } from '@mui/icons-material';



function App() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [addedSomething, setAddedSomething] = useState(false);

  // let addedSomething = false;

  const [formValue, setFormValue] = useState({});
  const [accountId, setAccountId] = useState();
  
  useEffect(() => {
    (async () => {     
      try {
        let [user, sources, items] = await Promise.all([
          getLoggedInUser(),         
          getSources(),
          getItems(),
        ]); // returns new promise with all data
        if (!user.error) {
          setUser(user);
          setSources(sources);
          setItems(items);
        }
        //Get the account_type_id from local storage, format it and put it into user object       
        const newFormValues = localStorage.getItem('newFormValues');                    
        user.user.account_type_id = parseInt(Object.values(newFormValues)[19]);         
        console.log(user, sources, items);
        setAccountId(user.user.account_type_id);                 
        setAddedSomething(false);
      } catch {}
    })();
    console.log("app's useEffect was called");
    console.log('addSomething from app', addedSomething);
  }, [addedSomething]);
 
function sortBy(arr) {
  return arr.sort((a,b) => {
    if(a < b) return -1
    if(a > b) return 1
    return 0
  })
}
sortBy(["b", "c"])
function deleteItems(items) {
  for(var i = 0; i < items.length; i++) {
    if(items[i].length == 0) {
      items.splice(i, 1)
    }
  }
}

var names = ["rachel", "", "Meghana", "", "", "Tim" ]
deleteItems(names)
  return (
    <>
      {user && (  
        <div className="App">
          <NavBar user={user} />
          <BrowserRouter>         
            <Routes>               
              <><Route
                  path="/"
                  element={<AccountTypePage handleSubmit={formValue => setFormValue(formValue)} handlefo/>}
                ></Route><Route
                  path="newEntry"
                  element={<NewEntryPage
                    sources={sources}
                    items={items}
                    setAddedSomething={setAddedSomething}
                    addedSomething={addedSomething} />}
                ></Route></>          
              <Route
                path="viewData"
                element={<ViewDataPage sources={sources} items={items} />}
              ></Route>
              <Route
                path="viewSourceData"
                element={<ViewSourceDataPage />}
              ></Route>
              <Route
                path="viewSource"
                element={<ViewSourcePage sources={sources} items={items} />}
              ></Route>
              <Route
                path="viewItem"
                element={<ViewItemPage items={items} />}
              ></Route>
              <Route
                path="viewGraph"
                element={<ViewGraphPage sources={sources} />}
              ></Route>
              <Route
                path="viewSourceGraph"
                element={<ViewSourceGraphPage sources={sources} />}
              ></Route>
              <Route
                path="bluetooth"
                element={<BluetoothPage sources={sources} items={items} />}
              ></Route>                       
               <Route
                path="account-type"
                element={<AccountTypePage handleSubmit={formValue => setFormValue(formValue)} handlefo/>}
              ></Route>
              <Route
                path="update-profile"
                element={<UpdateProfilePage handleSubmit={formValue => setFormValue(formValue)} handlefo/>}
              ></Route>
               <Route
                path="viewSourceData"
                element={<ViewSourceDataPage sources={sources} items={items} />}
              ></Route>                        
            </Routes>
          </BrowserRouter>
        </div>
      )}
      {!user && <LoginButton />}
    </>
  );
}

export default App;
