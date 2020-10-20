import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    // return <div>Logout</div>;
    return <Redirect to="/" />;
  }
}

const maptDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.logoutUser());
    },
  };
};

export default connect(null, maptDispatchToProps)(Logout);
