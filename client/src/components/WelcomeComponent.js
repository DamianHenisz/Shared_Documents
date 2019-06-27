import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "../styles/WelcomeStyle.scss";

class WelcomeComponent extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/documents");
  }
  render() {
    return (
      <div className="wrapper">
        <div className="row">
          <div className="col-md-6 section-left">
            <section>
              <p className="title-text">Shared Document</p>
              <div className="wrapper-buttons">
                <Link to="/login">
                  <button className="btn btn-success button-login"> Zaloguj się </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-danger button-register">Zarejestruj się</button>
                </Link>
              </div>
            </section>
          </div>
          <div className="col-md-6 section-right">
            <section>
              <img src={require("../img/welcome_picture.svg")} className="img-fluid img-style" alt="Welcome" />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

WelcomeComponent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(WelcomeComponent);
