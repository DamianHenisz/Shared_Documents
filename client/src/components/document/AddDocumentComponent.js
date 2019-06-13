import React, { Component } from "react";
import "../../styles/DocumentListStyles.scss";
//Example Controlled Component
class AddDocumentComponent extends Component {
  constructor() {
    super();
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
    if (this.state.nameDocument.length == 0) return;
    const newDoc = {
      nameDocument: this.state.nameDocument,
      content: ""
    };
    this.setState({ test: this.state.nameDocument, nameDocument: "" });
    this.props.documents.push(newDoc);
    console.log("list", this.props.documents);
  }

  render() {
    return (
      <div>
        <p>
          <input type="text" placeholder="Dodaj Dokument..." value={this.state.nameDocument} onChange={this.handleChangeNameDocument} />
          <button className="btn btn-success" onClick={this.onAddDocument}>
            Dodaj
          </button>
        </p>
      </div>
    );
  }
}
export default AddDocumentComponent;
