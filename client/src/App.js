import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      test: []
    }
  }

  // componentDidMount() {
  //   fetch('/websocket')
  //   .then (res => res.json())
  //   .then(test => this.setState ({test}, () => console.log('test frontend', test)));
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> this.state.test and save to reload.
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
