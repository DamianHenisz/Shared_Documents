import React, { Component } from "react";
import { Link } from "react-router-dom";

class WelcomeComponent extends Component {
  render() {
    return (
      <div>
        <p>WelcomeComponent.js</p>
        <Link to="/register">
          <button className="btn btn-primary">Zarejestruj Się </button>
        </Link>
        <Link to="login">
          <button className="btn btn-primary">Zaloguj Się </button>
        </Link>
      </div>
    );
  }
}

export default WelcomeComponent;
