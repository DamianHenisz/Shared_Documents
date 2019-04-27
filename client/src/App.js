import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import WelcomeComponent from "./components/WelcomeComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import DocumentComponent from "./components/DocumentComponent";
import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={DocumentComponent} />
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/login" component={LoginComponent} />
        <Route exact path="/document" component={DocumentComponent} />
      </Router>
    );
  }
}

export default App;
