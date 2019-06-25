import React, { Component } from "react";
import DocumentItemComponent from "./DocumentItemComponent";

class DocumentListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return this.props.documents.map((docName, index) => <DocumentItemComponent key={index} docName={docName} socket={this.props.socket} />);
  }
}

export default DocumentListComponent;
