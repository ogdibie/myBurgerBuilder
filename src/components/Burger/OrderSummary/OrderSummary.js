import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  //Only for debugging purposes
  // componentDidUpdate() {
  //   console.log("Order Summary Updated");
  // }

  render() {
    const ingredientSummary = Object.entries(this.props.ingredients).map(
      (ingredient) => (
        <li key={ingredient[0]}>
          <span style={{ textTransform: "capitalize" }}>{ingredient[0]}</span> :{" "}
          {ingredient[1]}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your Order</h3>{" "}
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" clicked={this.props.cancelPurchase}>
          CANCEL
        </Button>
        <Button type="Success" clicked={this.props.continuePurchase}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
