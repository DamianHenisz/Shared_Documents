import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/WelcomeStyle.scss";

class WelcomeComponent extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/documents");
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>WelcomeComponent1.js</p>
          <Link to="/register">
            <button className="btn btn-primary">Zarejestruj Się </button>
          </Link>
          <Link to="login">
            <button className="btn btn-primary">Zaloguj Się </button>
          </Link>
        </div>
        <div className="App-header">
          <p>WelcomeComponent1.js</p>
          <img src={require("../img/welcome_picture.svg")} className="App-logo" alt="WelcomePicture" />
        </div>
      </div>
    );
  }
}

WelcomeComponent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(WelcomeComponent);
