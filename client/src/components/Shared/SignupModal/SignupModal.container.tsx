
import React, { ReactElement, useState, useReducer, useEffect } from "react";
import SignupModal from "./SignupModal";
import { userSignup } from "../../../utils/signup";
import { AxiosError } from "axios";


interface Props {
  onSignupSuccess: () => void; 
}

interface SignupDefaultState {
  email: string;
  password: string;
  password2: string;
  username: string;
  signupError: string; 
  signupLoading: boolean; 
}

interface ClearInputErrors {
  type: typeof CLEAR_INPUT_ERRORS;
}

interface SetInputAction {
  type: typeof SET_INPUT;
  input: object;
}

interface SetInputErrorAction {
  type: typeof SET_INPUT_ERROR;
  error: object;
}

interface SignupErrorAction {
  type: typeof SIGNUP_ERROR,
  message: string;
}

interface SignupLoadingAction {
  type: typeof SIGNUP_LOADING, 
}

const SET_INPUT = "SET_INPUT";
const SET_INPUT_ERROR = "SET_INPUT_ERROR";
const CLEAR_INPUT_ERRORS = "CLEAR_INPUT_ERRORS";
const SIGNUP_ERROR = "SIGNUP_ERROR";
const SIGNUP_LOADING = "SIGNUP_LOADING"
type ReducerActions = SetInputAction | SetInputErrorAction | ClearInputErrors | SignupErrorAction | SignupLoadingAction;

function reducer(state: SignupDefaultState, action: ReducerActions) {
  switch (action.type) {
    case SET_INPUT:
      const { input } = action;
      return {
        ...state,
        ...input
      };
    
    case SIGNUP_ERROR: 
    return {
      ...state,
      signupLoading: false, 
      signupError: action.message, 
    }

    case SIGNUP_LOADING: 
    return {
      ...state,
      signupLoading: true, 
      signupError: "", 
    }

    default:
      return {
        ...state
      };
  }
}

const signupDefaultState: SignupDefaultState = {
  password: "",
  email: "",
  username: "",
  password2: "",
  signupError: "",
  signupLoading: false,
};

type InputFieldTypes = "password" | "username" | "email" | "name" | "password2";

export default function SignupModalContainer({onSignupSuccess}: Props): ReactElement {
  const [state, dispatch] = useReducer(reducer, signupDefaultState);


  const {
    password,
    password2,
    username,
    email,
    signupError,
    signupLoading
  } = state;

  const handleOnInputChange = (
    event: React.FormEvent<HTMLInputElement>,
    field: InputFieldTypes
  ) => {
    const input = { [field]: event.currentTarget.value };
    dispatch({ type: SET_INPUT, input });
  };

  const handleOnSignupClick = () => {

    dispatch({type: SIGNUP_LOADING})
    const user = {
      password,
      password2,
      username, 
      email, 
    }

      userSignup(user)
      .then((response) => {
        onSignupSuccess()
      })
      .catch((error) => {
        handleOnSignupError(error)
      })
  };


  const handleOnSignupError = (error: AxiosError) => {
    dispatch({type: SIGNUP_ERROR, message: "Could not sign up. Please make sure you meet the requirements."})
  }

  useEffect(() => {
   console.log(state)
  }, [state])

  const isValidEmail = (email: string) => {
    const isEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return isEmail.test(email)
  };

  const isValidUsername = (username: string) => {

    const isUsAlphabetOrNumber = new RegExp(/^[0-9a-zA-Z]+$/)

    return isUsAlphabetOrNumber.test(username)

  };

  const isValidPassword = (password: string) => {
    return password.length > 8
  };

  return (
    <SignupModal
      passwordValue={password}
      password2Value={password2}
      usernameValue={username}
      emailValue={email}
      onPasswordChange={event => handleOnInputChange(event, "password")}
      onPassword2Change={event => handleOnInputChange(event, "password2")}
      onUsernameChange={event => handleOnInputChange(event, "username")}
      onEmailChange={event => handleOnInputChange(event, "email")}
      onSignupClick={() => handleOnSignupClick()}
      emailValidated={isValidEmail(email)}
      usernameValidated={isValidUsername(username)}
      passwordValidated={isValidPassword(password)}
      buttonText={signupLoading ? "Loading" : "Sign up"}
      isButtonDisabled={signupLoading ? true : false}
      signupError={signupError}
    />
  );
}
