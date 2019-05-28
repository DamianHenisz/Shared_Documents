import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";

class RegisterComponent extends Component {
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
    this.onSignUp = this.onSignUp.bind(this);
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

  onSignUp() {
    const newUser = {
      userName: this.state.userName,
      password: this.state.password
    };
    console.log(newUser);
    //  this.setState({ isLoader: true });

    this.props.registerUser(newUser, this.props.history);
    //   this.setState({ isLoader: false });
  }
  render() {
    const errors = this.state.errors;

    return (
      <div>
        <p>RegisterComponent.js</p>
        <h3>Nazwa użytkownika:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.userName })} type="text" placeholder="Enter your Login" defaultValue={this.state.userName} onChange={this.handleChangeUserName} />
        {errors.userName && <div className="invalid-feedback">{errors.userName} </div>}
        <h3>Hasło:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.password })} type="password" placeholder="Enter your Password" defaultValue={this.state.password} onChange={this.handleChangePassword} />
        {errors.password && <div className="invalid-feedback">{errors.password} </div>}
        <div>
          <button className="btn btn-primary" onClick={this.onSignUp}>
            {this.state.isLoader && <i className="fa fa-spinner" aria-hidden="true" />}
            Zarejestruj Się
          </button>
        </div>
      </div>
    );
  }
}

RegisterComponent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterComponent));
