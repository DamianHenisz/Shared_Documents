import React, { Component } from "react";

import WelcomeComponent from "./components/WelcomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import DocumentComponent from "./components/DocumentComponent";

import test from "./components/test";

import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import jwt_decode from "jwt-decode";
import "./styles/App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);

  const decodedToken = jwt_decode(localStorage.token);
  store.dispatch(setCurrentUser(decodedToken));

  //Check for expired token
  const currentTIme = Date.now() / 1000;
  if (decodedToken.exp < currentTIme) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={WelcomeComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/test" component={test} />
          <Route exact path="/document" component={DocumentComponent} />
        </Router>
      </Provider>
    );
  }
}

export default App;
