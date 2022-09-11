import React from "react";
import ReactDOM from "react-dom/client";

import "./tailwind.output.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { authContext, productContext } from "./context";
import { User } from "./types";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// TODO replace with api calls
const sampleUser = { name: "bob", email: "jim@gmail.com", image: "test" };
const sampleProducts = [
  {
    SKU: "longSKU",
    image:
      "https://pixabay.com/get/g1b51dd716ffb312ecd5c41c376bca7e41993728778926651d85f74f9a8f71daaf5f65e85418b66eca2b313c355f7559d2e461744a6ce43a44640c03827612769_640.jpg",
    title: "test",
  },
];
root.render(
  <React.StrictMode>
    <authContext.Provider value={sampleUser as User}>
      <productContext.Provider value={sampleProducts}>
        <App />
      </productContext.Provider>
    </authContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
