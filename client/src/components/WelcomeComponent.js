import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class WelcomeComponent extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/test");
  }
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

WelcomeComponent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(WelcomeComponent);
