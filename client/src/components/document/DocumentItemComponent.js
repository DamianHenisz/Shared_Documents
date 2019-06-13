import React, { Component } from "react";
import "../../styles/DocumentListStyles.scss";
class DocumentComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { nameDocument } = this.props.doc;
    return <span>{nameDocument}</span>;
  }
}

export default DocumentComponent;
