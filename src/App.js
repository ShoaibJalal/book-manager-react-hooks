import React, { useContext } from "react";
import Books from "./Books";
import Login from "./Login";
import { LoginContext } from "./context/login-context";

function App(props) {
  const loginContext = useContext(LoginContext);

  let content = <Login />;
  if (loginContext.isAuth) {
    content = <Books />;
  }
  return content;
}

export default App;
