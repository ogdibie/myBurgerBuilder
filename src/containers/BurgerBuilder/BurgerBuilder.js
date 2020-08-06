import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  purchaseHandler() {
    this.setState({ purchasing: true });
  }
  updatePurchasebleHandler = (ingredients) => {
    const purchaseable =
      Object.values(ingredients).reduce((sum, el) => sum + el, 0) > 0;
    this.setState({ purchaseable });
  };

  addIngredientHandler = (type) => {
    this.setState(({ ingredients, totalPrice }) => {
      const newIngredients = { ...ingredients };
      newIngredients[type] = newIngredients[type] + 1;
      this.updatePurchasebleHandler(newIngredients);
      const newTotalPrice = totalPrice + INGREDIENT_PRICES[type];
      return {
        ingredients: newIngredients,
        totalPrice: newTotalPrice,
      };
    });
  };

  removeIngredientHandler = (type) => {
    this.setState(({ ingredients, totalPrice }) => {
      if (ingredients[type] <= 0) return;
      const newIngredients = { ...ingredients };
      newIngredients[type] = newIngredients[type] - 1;
      this.updatePurchasebleHandler(newIngredients);
      const newTotalPrice = totalPrice - INGREDIENT_PRICES[type];
      return {
        ingredients: newIngredients,
        totalPrice: newTotalPrice,
      };
    });
  };
  render() {
    const disabledButtons = { ...this.state.ingredients };
    for (let key in disabledButtons) {
      disabledButtons[key] = disabledButtons[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledButtons={disabledButtons}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchase={this.purchaseHandler.bind(this)}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
