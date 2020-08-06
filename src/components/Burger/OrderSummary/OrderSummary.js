import React from "react";
const OrderSummary = (props) => {
  const ingredientSummary = Object.entries(
    props.ingredients
  ).map((ingredient) => (
    <li key={ingredient[0]}>{`${ingredient[0]} : ${ingredient[1]}`}</li>
  ));
  return (
    <React.Fragment>
      <h3>Your Order</h3>{" "}
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </React.Fragment>
  );
};

export default OrderSummary;
