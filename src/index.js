import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import LoginContextProvider from "./context/login-context";

ReactDOM.render(
  <LoginContextProvider>
    <App />
  </LoginContextProvider>,
  document.getElementById("root")
);

serviceWorker.register();
