import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends Component {
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        {!this.props.loggedIn ? (
          <NavigationItem link="/login" exact>
            Login
          </NavigationItem>
        ) : (
          <NavigationItem link="/logout" exact>
            Logout
          </NavigationItem>
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.logged_in,
  };
};

export default connect(mapStateToProps)(NavigationItems);
