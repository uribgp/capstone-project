import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import Button from '../Shared/Button/Button'
import Input from '../Shared/Input/Input'
import {signupUser} from '../../store/user/user-actions' 
import { useDispatch } from 'react-redux'
export default function SignUpContainer({onSignUpSuccess}) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const dispatch = useDispatch()

  const handleOnSignUpClick = () => {

       dispatch(signupUser(username, email, password))
 /*      onSignUpSuccess()  */

  }

  return (
    <div className="sign-up-container">
      <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} icon={<AiOutlineUser />} />
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} icon={<AiOutlineMail/>} /> 
      <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} icon={<AiFillLock />} />
      <Button text="Sign up" onClick={handleOnSignUpClick} />
    </div>
  )
}
