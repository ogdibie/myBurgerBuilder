import React from "react";
import Aux from "../../../hoc/Aux";
const OrderSummary = (props) => {
  const ingredientSummary = Object.entries(props.ingredients).map(
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
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
