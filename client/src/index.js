import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RestaurantContextProvider from "./context/RestaurantContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <RestaurantContextProvider>
      <App />
    </RestaurantContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
