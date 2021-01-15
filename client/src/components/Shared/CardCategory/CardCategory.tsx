import React, { ReactElement } from "react";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./card-category.module.scss";
interface Props {
  category: string;
  isSelected: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

export default function CardCategory({
  onChange,
  value,
  category,
  isSelected,
}: Props): ReactElement {
  return (
    <div
      className={`${styles.card_category} ${
        isSelected
          ? styles.card_category__border_active
          : styles.card_category__border
      }`}
    >
      <Checkbox
        className={`${styles.card_category__checkbox}`}
        value={value}
        isChecked={isSelected}
        onChange={(event) => onChange(event)}
      />
      <div className="card-category-name">{category}</div>
    </div>
  );
}
