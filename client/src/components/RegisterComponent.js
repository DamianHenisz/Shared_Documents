import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {}
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
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
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
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
          <button onClick={this.onSignUp} className="btn btn-primary">
            Zarejestruj Się
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
