import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {},
      isLoader: false
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChangeUserName(event) {
    this.setState({ userName: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSignIn() {
    const user = {
      userName: this.state.userName,
      password: this.state.password
    };
    console.log(user);
    this.setState({ isLoader: true });
    this.props.loginUser(user, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <p>LoginComponent.js</p>
        <h3>Nazwa użytkownika:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.userName })} type="text" placeholder="Enter your Login" defaultValue={this.state.userName} onChange={this.handleChangeUserName} />
        <div className="invalid-feedback">{this.state.errors.userName} </div>
        <h3>Hasło:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.password })} type="password" placeholder="Enter your Password" defaultValue={this.state.password} onChange={this.handleChangePassword} />
        <div className="invalid-feedback">{this.state.errors.password} </div>
        <div>
          <button className="btn btn-primary" onClick={this.onSignIn}>
            {this.state.isLoader && <i className="fa fa-spinner" aria-hidden="true" />}
            Zaloguj się
          </button>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(LoginComponent));
