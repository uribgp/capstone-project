import React, { ReactElement, useState } from "react";
import Container from "../Shared/Container/Container";
import Input from "../Shared/Input/Input";
import textStyles from "../../styles/typography.module.scss";
import Button from "../Shared/Button/Button";
import { useDispatch } from "react-redux";
// import { userSignup } from "../../utils/signup";
import { userSignup } from "../../redux/user/user-actions";

interface Props {}

export default function SignupContainer({}: Props): ReactElement {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const dispatch = useDispatch();

  const handleOnFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleOnSignupClick = () => {
    dispatch(userSignup(formValues));
  };

  return (
    <div>
      <Container>
        <div>
          <div className={`${textStyles.textLarge} ${textStyles.bold}`}>
            Take the next step in your lifting career today.
          </div>
          <div className={`${textStyles.textSmall} ${textStyles.faded}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </div>
        </div>

        <Input
          placeholder="Username"
          value={formValues.username}
          name="username"
          onChange={(event) => handleOnFormChange(event)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={formValues.password}
          name="password"
          onChange={(event) => handleOnFormChange(event)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={formValues.password2}
          name="password2"
          onChange={(event) => handleOnFormChange(event)}
        />
        <Input
          placeholder="Email"
          value={formValues.email}
          name="email"
          onChange={(event) => handleOnFormChange(event)}
        />
        <Button fullWidth={true} onClick={handleOnSignupClick}>
          Sign Up
        </Button>
      </Container>
    </div>
  );
}
