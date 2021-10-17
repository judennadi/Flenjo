import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RestaurantContextProvider from "./context/RestaurantContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RestaurantContextProvider>
        <App />
      </RestaurantContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
