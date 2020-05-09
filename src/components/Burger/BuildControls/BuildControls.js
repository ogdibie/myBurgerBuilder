import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  const bldControls = controls.map((control) => (
    <BuildControl
      key={control.type}
      label={control.label}
      added={() => props.ingredientAdded(control.type)}
      removed={() => props.ingredientRemoved(control.type)}
      disabled={props.disabledButtons[control.type]}
    />
  ));
  return <div className={classes.BuildControls}>{bldControls}</div>;
};

export default BuildControls;
