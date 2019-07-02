import React, { Component } from "react";

//Example Controlled Component
class AddDocumentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameDocument: ""
    };
    this.handleChangeNameDocument = this.handleChangeNameDocument.bind(this);
    this.onAddDocument = this.onAddDocument.bind(this);
  }

  handleChangeNameDocument(event) {
    this.setState({ nameDocument: event.target.value });
  }

  onAddDocument() {
    if (this.state.nameDocument.length === 0) return;
    const newDoc = {
      nameDocument: this.state.nameDocument,
      content: ""
    };
    this.props.socket.emit("add-document", newDoc);
    this.setState({ nameDocument: "" });
  }

  render() {
    return (
      <div>
        <input className="form-control" type="text" placeholder="Dodaj Dokument..." value={this.state.nameDocument} onChange={this.handleChangeNameDocument} />
        <button className="btn btn-success button-addDocs" onClick={this.onAddDocument}>
          Dodaj
        </button>
      </div>
    );
  }
}
export default AddDocumentComponent;
