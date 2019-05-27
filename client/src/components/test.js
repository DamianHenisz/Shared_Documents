import React, { Component } from "react";
import { connect } from "react-redux";

import { setCurrentUser } from "../actions/authActions";

import LoginButton from "./LogoutButtonComponent";

class test extends Component {
  constructor() {
    super();
    this.state = {
      token: ""
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.history.push("/");
    this.setState({ token: localStorage.getItem("token") });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <p>
          <h3>
            <i className="far fa-user" />
            {user.userName}
          </h3>
          <LoginButton />
        </p>
        <p>Test Login OK</p>
        <p>{this.state.token}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { setCurrentUser }
)(test);
