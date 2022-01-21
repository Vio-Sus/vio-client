import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [whatever, setWhatever] = useState("");

  useEffect(() => {
    axios
      .get("/api/test")
      .then((result) => result.data)
      .then((data) => setWhatever(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{whatever}</h1>
    </div>
  );
}

export default App;
