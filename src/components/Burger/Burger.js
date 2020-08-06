import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((ingredient) => {
      const burgerIngredients = [];
      for (let index = 0; index < ingredients[ingredient]; index++) {
        burgerIngredients.push(
          <BurgerIngredient key={ingredient + index} type={ingredient} />
        );
      }
      return burgerIngredients;
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start entering ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
