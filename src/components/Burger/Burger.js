import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((ingredient) => {
      return [...Array(ingredients[ingredient])].map((_, index) => (
        <BurgerIngredient key={ingredient + index} type={ingredient} />
      ));
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
