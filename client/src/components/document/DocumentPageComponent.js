import React, { Component } from "react";
import "../../styles/App.scss";
import "../../styles/DocumentStyles.scss";
import socketIOClient from "socket.io-client";

import AddDocumentComponent from "./AddDocumentComponent";
import DocumentListComponent from "./DocumentListComponent";

class DocumentPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      documents: [],
      textDocument: " "
      //   socket: socketIOClient("localhost:8080/")
    };
    this.handleChange = this.handleChange.bind(this);

    //  this.exchangeSockets = this.exchangeSockets.bind(this);
  }

  componentWillMount() {
    // this.registerGetDataEvent();
    // this.registerUpdateDataEvent();
  }
  componentDidMount() {}

  handleChange(event) {
    this.setState({ textDocument: event.target.value });
  }

  // registerUpdateDataEvent = () => {
  //   setInterval(() => {
  //     console.log(this.state.textDocument);
  //     this.state.socket.emit("update-document", this.state.textDocument);
  //   }, 100);
  // };

  // registerGetDataEvent = () => {
  //   this.state.socket.on("get-document", document => {
  //     this.setState({
  //       textDocument: document
  //     });
  //   });
  // };

  // // async exchangeSockets() {
  // //   this.state.socket.on("document", function(document) {
  // //     console.log("exchangeSockets", document);
  // //     // this.setState({ textDocument: document });
  // //   });
  // //   this.state.socket.emit("document", this.state.textDocument);
  // //   console.log("save", this.state.textDocument);
  // //   // setTimeout(this.exchangeSockets, 1000);
  // // }

  downloadDocument() {
    //TODO: save file
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AddDocumentComponent documents={this.state.documents} />
          <div className="sidenav">
            <DocumentListComponent documents={this.state.documents} />
          </div>
          <textarea className="Document" value={this.state.textDocument} onChange={this.handleChange} />
          <button onClick={this.downloadDocument}>Save </button>
        </header>
      </div>
    );
  }
}

export default DocumentPageComponent;
