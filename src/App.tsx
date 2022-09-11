import React, { useContext } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { authContext } from "./context";

function App() {
  const user = useContext(authContext);
  return (
    <div className="App">
      {user ? (
        <Dashboard />
      ) : (
        <div>
          <h1>log in</h1>
        </div>
      )}
    </div>
  );
}

export default App;
