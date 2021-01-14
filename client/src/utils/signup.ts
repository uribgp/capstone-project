import { User } from "../types/user";
import axios from "axios";
import { UserSignup } from "../types/user-signup";

export const userSignup = async (user: UserSignup) => {

  const {email, password, username, password2} = user;
    const response = await axios.post('/api/users/signup', {
      email,
      password,
      username,
      password2
    })
    return response
}