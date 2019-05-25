import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import WelcomeComponent from "./components/WelcomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import DocumentComponent from "./components/DocumentComponent";

import { Provider } from "react-redux";
import store from "./store/store";
import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={WelcomeComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/document" component={DocumentComponent} />
        </Router>
      </Provider>
    );
  }
}

export default App;
