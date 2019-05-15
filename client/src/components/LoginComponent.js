import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {}
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
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

    axios
      .post("/api/users/login", user)
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
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
          <button onClick={this.onSignIn} className="btn btn-primary">
            Zaloguj się
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
