import React, { Component } from "react";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      signUpLogin: "",
      signUpPassword: ""
    };

    this.handleChangeSignUpLogin = this.handleChangeSignUpLogin.bind(this);
    this.handleChangeSignUpPassword = this.handleChangeSignUpPassword.bind(this);
  }

  handleChangeSignUpLogin(event) {
    this.setState({ signUpLogin: event.target.value });
  }
  handleChangeSignUpPassword(event) {
    this.setState({ signUpPassword: event.target.value });
  }

  render() {
    return (
      <div>
        <p>RegisterComponent.js</p>
        <h3>Login:</h3>
        <input type="text" placeholder="Enter your Login" defaultValue={this.state.signUpLogin} onChange={this.handleChangeSignUpLogin} />
        <h3>Hasło:</h3>
        <input type="password" placeholder="Enter your Password" defaultValue={this.state.signUpPassword} onChange={this.handleChangeSignUpPassword} />
        <div>
          <button onClick={this.onSignUp} className="">
            Zarejestruj Się
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
