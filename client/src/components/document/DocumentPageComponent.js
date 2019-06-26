import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/authActions";

import "../../styles/App.scss";
import "../../styles/DocumentStyles.scss";
import socketIOClient from "socket.io-client";
import LogoutButton from "../LogoutButtonComponent";
import AddDocumentComponent from "./AddDocumentComponent";
import DocumentListComponent from "./DocumentListComponent";

class DocumentPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
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
    if (!this.props.auth.isAuthenticated) this.props.history.push("/");
    this.setState({ token: localStorage.getItem("token") });

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
    const { user } = this.props.auth;

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
          <p>
            <h3>
              <i className="far fa-user" />
              {user.userName}
            </h3>
            <LogoutButton />
          </p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { setCurrentUser }
)(DocumentPageComponent);
