import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Login from "./containers/Auth/Login";
import Logout from "./containers/Auth/Logout";

import * as actions from "./store/actions/index";
class App extends Component {
  componentDidMount() {
    this.props.checkAuthentication();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthentication: () => {
      dispatch(actions.checkAuthentication());
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
