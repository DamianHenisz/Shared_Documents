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
      docsName: "",
      textDocument: "",
      socket: socketIOClient("localhost:8080/")
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.registerGetDataEvent();
    this.registerUpdateDataEvent();
  }
  componentDidMount() {
    this.state.socket.on("list-documents", docs => {
      this.setState({ documents: docs });

      this.state.socket.on("switch-document", document => {
        this.setState({ docsName: document.nameDocument, textDocument: document.content });
      });
    });
  }

  handleChange(event) {
    this.setState({ textDocument: event.target.value });
  }

  registerUpdateDataEvent = () => {
    setInterval(() => {
      console.log("registerUpdateDataEvent", this.state.docsName, this.state.textDocument);
      this.state.socket.emit("update-document", this.state.docsName, this.state.textDocument);
    }, 100);
  };

  registerGetDataEvent = () => {
    this.state.socket.on("document-content", docContent => {
      this.setState({
        textDocument: docContent
      });
    });
  };

  downloadDocument() {
    //TODO: save file
  }

  render() {
    let disabledTextArea = true;
    let textplaceHolder = "Aby zacząć pisać, dodaj dokument lub wybierz istniejący dokument z listy...";

    if (this.state.documents.length !== 0 && this.state.docsName.length >= 1) {
      disabledTextArea = false;
      textplaceHolder = "Zacznij pisać...";
    }
    return (
      <div className="App">
        <header className="App-header">
          <AddDocumentComponent socket={this.state.socket} />
          <div className="sidenav">
            <DocumentListComponent documents={this.state.documents} socket={this.state.socket} />
          </div>
          <textarea className="Document" placeholder={textplaceHolder} disabled={disabledTextArea} value={this.state.textDocument} onChange={this.handleChange} />
          <button onClick={this.downloadDocument}>Save </button>
        </header>
      </div>
    );
  }
}

export default DocumentPageComponent;
