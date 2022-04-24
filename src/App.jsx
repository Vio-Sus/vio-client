import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getItems, getLoggedInUser } from './common/network';
import LoginButton from './components/LoginButton';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard';
import NewEntryPage from './Pages/NewEntry';
import ViewDataPage from './Pages/ViewData';
import ViewSourcePage from './Pages/ViewSource';
import ViewItemPage from './Pages/ViewItem';
import ViewGraphPage from './Pages/ViewGraph';
import BluetoothPage from './Pages/Bluetooth';
import AccountTypePage from './Pages/AccountType';

import NavBarLogIn from './components/NavBarLogIn';
import { NavigateBeforeTwoTone } from '@mui/icons-material';

function App() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [addedSomething, setAddedSomething] = useState(false);
  //
  // let addedSomething = false;

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
        console.log(user, sources, items);
        setAddedSomething(false);
      } catch {}
    })();
    console.log("app's useEffect was called");
    console.log('addSomething from app', addedSomething);
  }, [addedSomething]);

  return (
    <>
      {user && (
        <div className="App">
          <NavBar user={user} />
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<DashboardPage />}></Route> */}
              <Route
                path="/"
                element={<ViewDataPage sources={sources} items={items} />}
              ></Route>
              <Route
                path="newEntry"
                element={
                  <NewEntryPage
                    sources={sources}
                    items={items}
                    setAddedSomething={setAddedSomething}
                    addedSomething={addedSomething}
                  />
                }
              ></Route>
              <Route
                path="viewData"
                element={<ViewDataPage sources={sources} items={items} />}
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
                path="bluetooth"
                element={<BluetoothPage sources={sources} items={items} />}
              ></Route>
               <Route
                path="account-type"
                element={<AccountTypePage sources={sources} items={items} />}
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
