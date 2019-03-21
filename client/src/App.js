import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'localhost:8080',
      test: 'OK man'
    }
  }

  componentDidMount() {
     socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           {this.state.test}
          </p>  
        </header>
        <textarea className="Document">
          </textarea>
        <section>
        </section>
      </div>
    );
  }
}

export default App;
