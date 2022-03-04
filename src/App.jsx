import './App.css';
import { useEffect, useState } from 'react';
import { getSources, getItems, getLoggedInUser } from './network';
import LoginButton from './components/LoginButton';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard';
import NewEntryPage from './Pages/NewEntry';
import ViewDataPage from './Pages/ViewData';
import { connectBT, disconnectBT } from './bluetooth';
import ViewSourcePage from './Pages/ViewSource';
import ViewItemPage from './Pages/ViewItem';

function App() {
  const [sources, setSources] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [weight, setWeight] = useState(0);

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
        }
        setSources(sources);
        setItems(items);
        console.log(user, sources, items);
      } catch {}
    })();
  }, []);



  return (
    <>
      <p>{weight}</p>
      <button onClick={() => connectBT(setWeight)}>CONNECT BLUETOOTH</button>
      <button onClick={disconnectBT}>DISCONNECT BLUETOOTH</button>
      {user && (
        <div className="App">
          <NavBar user={user} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashboardPage />}></Route>
              <Route
                path="newEntry"
                element={<NewEntryPage sources={sources} items={items} />}
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
            </Routes>
          </BrowserRouter>
        </div>
      )}
      {!user && <LoginButton />}
    </>
  );
}

export default App;
