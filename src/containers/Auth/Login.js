import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Auth.css";

import * as actions from "../../store/actions/index";
class Login extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Username",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.controls,
    };
    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ controls: updatedLoginForm, formIsValid: formIsValid });
  };

  loginHandler = (event) => {
    event.preventDefault();

    let formData = {};

    for (let formElementIdentifier in this.state.controls) {
      formData[formElementIdentifier] = this.state.controls[
        formElementIdentifier
      ].value;
    }

    this.props.onLoginSubmit(formData);
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.loginHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Login
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    const loginRedirect = this.props.loggedIn ? <Redirect to="/" /> : null;

    return (
      <div className={classes.Auth}>
        {loginRedirect}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    loggedIn: state.auth.logged_in,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSubmit: (formData) => {
      dispatch(actions.loginSubmit(formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login, axios);
