import React, { Component } from "react";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
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
  }
  render() {
    return (
      <div>
        <p>RegisterComponent.js</p>
        <h3>Nazwa użytkownika:</h3>
        <input type="text" placeholder="Enter your Login" defaultValue={this.state.userName} onChange={this.handleChangeUserName} />
        <h3>Hasło:</h3>
        <input type="password" placeholder="Enter your Password" defaultValue={this.state.password} onChange={this.handleChangePassword} />
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
