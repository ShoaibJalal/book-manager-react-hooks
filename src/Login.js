import React, { useContext } from "react";
import "./Login.css";
import { LoginContext } from "./context/login-context";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol
} from "mdbreact";

const Login = () => {
  const loginContext = useContext(LoginContext);

  const loginHandler = () => {
    loginContext.login();
  };
  return (
    <MDBContainer className="login">
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>You are not Logged In.</MDBCardTitle>
              <MDBCardText>Please Login to continue!</MDBCardText>
              <MDBBtn color="pink" onClick={loginHandler}>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
