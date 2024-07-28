import React from "react";
import "./App.css";
import Body from "./Components/Body";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Body />
      <ToastContainer />
    </div>
  );
}

export default App;
