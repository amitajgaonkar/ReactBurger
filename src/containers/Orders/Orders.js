import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as action from "../../store/actions/index";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.getOrders();
    }
  }

  componentDidUpdate(prevProps) {
    console.log("Didupdate", prevProps);
    console.log("this.props", this.props);
    if (
      (this.props.isLoggedIn !== prevProps.isLoggedIn ||
        this.props.access_token !== prevProps.access_token) &&
      this.props.isLoggedIn
    ) {
      this.getOrders();
    }
  }

  render() {
    let orders = <Spinner />;

    if (this.props.isLoggedIn) {
      if (!this.state.loading) {
        orders = this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ));
      }
    } else {
      orders = (
        <div>
          Please <NavLink to="/login">login</NavLink> to see your orders
        </div>
      );
    }

    return <div>{orders}</div>;
  }

  getOrders = async () => {
    await axios
      .get(
        "http://react-drupal.com/api/v1/commerce_order/default?include=order_items.purchased_entity",
        {
          headers: {
            Authorization: "Bearer ".concat(this.props.access_token),
            Accept: "application/json",
            "Content-Type": "application/vnd.api+json",
          },
        }
      )
      .then((response) => {
        console.log();
        if (response && response.status === 200) {
          let fetchedOrders = this.prepareOrders(response);
          this.setState({ loading: false, orders: fetchedOrders });
        } else {
          //Dispatch refresh token action
          this.props.refreshAccessToken();
        }
      })
      .catch((err) => {
        this.props.refreshAccessToken();
      });
  };

  prepareOrders = (res) => {
    let fetchedOrders = [];
    for (let order of res.data.data) {
      let ingredients = this.getOrderItems(order.id, res.data.included);

      fetchedOrders.push({
        id: order.id,
        ingredients: ingredients,
        orderData: {
          name: order.attributes.mail,
          email: order.attributes.mail,
          country: order.attributes.billing_information.address.country_code,
          street: order.attributes.billing_information.address.address_line1,
          zipCode: order.attributes.billing_information.address.postal_code,
          deliveryMethod: order.attributes.payment_instrument,
        },
        price: order.attributes.order_total.total.number,
      });
    }
    return fetchedOrders;
  };

  getOrderItems = (orderId, included) => {
    let ingredients = {};
    included.forEach((item) => {
      if (
        "order_id" in item.relationships &&
        item.relationships.order_id.data.id === orderId
      ) {
        ingredients[item.attributes.title] = item.attributes.quantity;
      }
    });

    return ingredients;
  };
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.logged_in,
    access_token: state.auth.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    refreshAccessToken: () => dispatch(action.refreshAccessToken()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Orders, axios)
);
