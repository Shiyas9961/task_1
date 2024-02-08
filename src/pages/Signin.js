import React, { Fragment, useEffect, useState } from 'react'
import { authenticate } from '../authenticate'
//import { GlobalContext } from '../context/globalContext'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, loginFail, loginRequest, loginSuccess } from '../slices/authSlice'

const Signin = () => {
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { accessToken, error, loading } = useSelector(state => state.authState)
  const navigate = useNavigate()

  useEffect(() => {
    if(accessToken){
      navigate('/')
    }
  },[accessToken, navigate])

  const handleSubmit = async (event) => {
      event.preventDefault()
      dispatch(clearError())
      try{
        dispatch(loginRequest())
        const data = await authenticate(email, password)
        console.log(data.accessToken.jwtToken)
        dispatch(loginSuccess(data.accessToken.jwtToken))
        localStorage.setItem('accessToken', JSON.stringify(data.accessToken.jwtToken))
      }catch(error){
        dispatch(loginFail(error.message))
        console.log(error.message)
      }
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <Fragment>
        {
          error ? <p className='errClass'>{error}</p> : null
        }
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Username : </label>
          <input 
            type="text" 
            id='email'  
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="password">Password : </label>
          <input 
            type="password" 
            id='password'  
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </Fragment>
  )
}

export default Signin