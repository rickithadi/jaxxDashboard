import React from "react";
import ReactDOM from "react-dom/client";

import "./tailwind.output.css";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { authContext } from "./context";
import { User } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// TODO replace with api calls
const sampleUser = { name: "bob", email: "jim@gmail.com", image: "test" };

root.render(
  <React.StrictMode>
    {/* <authContext.Provider value={undefined}> */}
    <authContext.Provider value={sampleUser as User}>
      <App />
    </authContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
