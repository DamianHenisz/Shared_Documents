import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions";

class LogoutButtonComponent extends Component {
  constructor() {
    super();
    this.state = {};

    this.onLogOut = this.onLogOut.bind(this);
  }
  componentDidUpdate() {
    if (!this.props.auth.isAuthenticated) window.location.href = "/";
  }
  onLogOut() {
    this.props.logoutUser({});
  }
  render() {
    return (
      <button className="btn btn-primary" onClick={this.onLogOut}>
        {this.state.isLoader && <i className="fa fa-spinner" aria-hidden="true" />}
        Wyloguj Się
      </button>
    );
  }
}
LogoutButtonComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(LogoutButtonComponent);
