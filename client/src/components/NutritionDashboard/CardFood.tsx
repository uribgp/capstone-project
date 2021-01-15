import React, { ReactElement, useState } from "react";
import styles from "./card-food.module.scss";

interface Props {
    name: string;
    calories: number;
    protein: number
    fat: number
    carbs: number
}

export default function CardFood({
    name,
    calories,
    protein,
    fat,
    carbs
}: Props): ReactElement {
  // const [settings, setSettings] = useState(1);
  
  return (
    <div className={`${styles.card_food}`}>
      <div className="card-food-name">{name}</div>
      Calories: {calories}
      Brotein: {protein}
      Fat: {fat}
      Carbs: {carbs}
    </div>
  );
}
