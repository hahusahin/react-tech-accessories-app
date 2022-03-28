import React, { useState } from 'react'
import LoginForm from '../components/user/LoginForm'
import SignupForm from '../components/user/SignupForm'

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const switchAuthModeHandler = () => {
    setIsLoginMode(prevState => !prevState)
  }

  return (
    <div className='container'>
      {isLoginMode && <LoginForm onToggle={switchAuthModeHandler}/>}
      {!isLoginMode && <SignupForm onToggle={switchAuthModeHandler}/>}
    </div>
  )
}

export default Login