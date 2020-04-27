import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients).map((ingredient) => {
    return [...Array(ingredients[ingredient])].map((_, index) => (
      <BurgerIngredient key={ingredient + index} type={ingredient} />
    ));
  });
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
