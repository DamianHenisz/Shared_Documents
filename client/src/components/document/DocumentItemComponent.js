import React, { Component } from "react";
import "../../styles/DocumentStyles.scss";

class DocumentComponent extends Component {
  constructor(props) {
    super(props);
    this.changeEditedDocument = this.changeEditedDocument.bind(this);
  }
  changeEditedDocument() {
    this.props.socket.emit("get-document", this.props.docName);
  }
  render() {
    return <span onClick={this.changeEditedDocument}>{this.props.docName}</span>;
  }
}

export default DocumentComponent;
