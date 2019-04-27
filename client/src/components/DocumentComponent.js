import React, { Component } from "react";
import "../styles/App.scss";
import socketIOClient from "socket.io-client";

class DocumentComponent extends Component {
  constructor() {
    super();
    this.state = {
      textDocument: " ",
      value: 0,
      socket: socketIOClient("localhost:8080/")
    };
    this.handleChange = this.handleChange.bind(this);
    this.increase = this.increase.bind(this);
    this.exchangeSockets = this.exchangeSockets.bind(this);
  }

  componentWillMount() {
    this.registerGetDataEvent();
    this.registerUpdateDataEvent();
  }

  componentDidMount() {
    this.increase();
    //  this.exchangeSockets();
  }

  handleChange(event) {
    this.setState({ textDocument: event.target.value });
  }

  registerUpdateDataEvent = () => {
    setInterval(() => {
      console.log(this.state.textDocument);
      this.state.socket.emit("update-document", this.state.textDocument);
    }, 100);
  };

  registerGetDataEvent = () => {
    this.state.socket.on("get-document", document => {
      this.setState({
        textDocument: document
      });
    });
  };

  async exchangeSockets() {
    this.state.socket.on("document", function(document) {
      console.log("exchangeSockets", document);
      // this.setState({ textDocument: document });
    });
    this.state.socket.emit("document", this.state.textDocument);
    console.log("save", this.state.textDocument);
    // setTimeout(this.exchangeSockets, 1000);
  }

  downloadDocument() {
    //TODO: save file
  }
  increase() {
    this.setState({ value: this.state.value + 1 });
    setTimeout(this.increase, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <textarea className="Document" value={this.state.textDocument} onChange={this.handleChange} />
          <button onClick={this.downloadDocument}>Save </button>
        </header>
        <h1>{this.state.value}</h1>
      </div>
    );
  }
}

export default DocumentComponent;
