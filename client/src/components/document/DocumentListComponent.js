import React, { Component } from "react";
import DocumentItemComponent from "./DocumentItemComponent";

class DocumentListComponent extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}

  render() {
    return this.props.documents.map(doc => <DocumentItemComponent key={this.props.doc} doc={doc} />);
  }
}

export default DocumentListComponent;
