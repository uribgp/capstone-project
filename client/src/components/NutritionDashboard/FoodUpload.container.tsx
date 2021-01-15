import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Button from "../Shared/Button/Button";
import Container from "../Shared/Container/Container";
import Input from "../Shared/Input/Input";
import { postFood, fetchFood } from "../../redux/nutrition/nutrition-actions";

interface Props {}

export default function FoodUploadContainer({}: Props): ReactElement {
  // const [formStage, setFormStage] = useState(1);
  const [foodInformation, setFoodInformation] = useState({
    name: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  });

  const [errors, setErrors] = useState({
    foodError: "",
  });

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFood())
    console.log(errors);
  }, [errors, dispatch]);

  const handleOnFormSubmit = () => {
    dispatch(postFood(foodInformation));
  }

  const handleOnNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFoodInformation({ ...foodInformation, name: value });
  };

  const handleOnCaloriesChange = (caloriesValue: number) => {
    setFoodInformation({ ...foodInformation, calories: caloriesValue });
  };

  const handleOnProteinChange = (proteinValue: number) => {
    setFoodInformation({ ...foodInformation, protein: proteinValue });
  };

  const handleOnFatChange = (fatValue: number) => {
    setFoodInformation({ ...foodInformation, fat: fatValue });
  };

  const handleOnCarbsChange = (carbsValue: number) => {
    setFoodInformation({ ...foodInformation, carbs: carbsValue });
  };

  const { name, calories, protein, fat, carbs } = foodInformation;
  return (
    <div>
      <Container>
        <Input
          value={name}
          placeholder="Food Name"
          onChange={(event) => handleOnNameChange(event)}
        />
        <Input
          type="number"
          value={calories}
          placeholder="Calories"
          onChange={(event) => handleOnCaloriesChange(event.currentTarget.valueAsNumber)}
        />
        <Input
          type="number"
          value={protein}
          placeholder="Protein"
          onChange={(event) => handleOnProteinChange(event.currentTarget.valueAsNumber)}
        />
        <Input
          type="number"
          value={fat}
          placeholder="Fat"
          onChange={(event) => handleOnFatChange(event.currentTarget.valueAsNumber)}
        />
        <Input
          type="number"
          value={carbs}
          placeholder="Carbs"
          onChange={(event) => handleOnCarbsChange(event.currentTarget.valueAsNumber)}
        />
        <Button onClick={handleOnFormSubmit}>Upload</Button>
      </Container>
    </div>
  );
};
