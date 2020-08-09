import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
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
    loading: false,
  };

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  cancelPurchaseHandler() {
    this.setState({ purchasing: false });
  }

  continuePurchaseHandler = () => {
    // alert("You continued");
    this.setState({
      loading: true,
    });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: "Ruona Dibie",
        address: {
          street: "Test street",
          zipCode: "04401",
          state: "Maine",
        },
        email: "test@test.com",
      },
      deliveryMethod: "Pick-Up",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  };
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

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchase={this.cancelPurchaseHandler.bind(this)}
        continuePurchase={this.continuePurchaseHandler}
        price={this.state.totalPrice}
      />
    );
    if (this.state.loading) orderSummary = <Spinner />;
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelPurchase={this.cancelPurchaseHandler.bind(this)}
        >
          {orderSummary}
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

export default withErrorHandler(BurgerBuilder, axios);
