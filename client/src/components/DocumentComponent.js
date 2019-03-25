import React, { Component } from "react";
import "../styles/App.scss";
import socketIOClient from "socket.io-client";

class DocumentComponent extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:8080/socket",
      test: "OK man",
      textDocument: " "
    };
    this.exchangeSockets = this.exchangeSockets.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on("document", function(textDocument) {
      console.log("aasdd");
    });
  }

  handleChange(event) {
    this.setState({ textDocument: event.target.value });
  }
  exchangeSockets() {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("document", this.state.textDocument);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <textarea className="Document" value={this.state.textDocument} onChange={this.handleChange} />
          <p>{this.state.test}</p>
          <button onClick={this.exchangeSockets}>Save </button>
        </header>
      </div>
    );
  }
}

export default DocumentComponent;
