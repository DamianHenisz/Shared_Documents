import React, { Component } from "react";
import { connect } from "react-redux";

import { setCurrentUser } from "../actions/authActions";
class test extends Component {
  constructor() {
    super();
    this.state = {
      token: ""
    };
  }
  componentDidMount() {
    this.setState({ token: localStorage.getItem("token") });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <p>Test Login OK</p>
        <h3>Nazwa użytkownika:</h3>
        <p> {user.userName}</p>
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
