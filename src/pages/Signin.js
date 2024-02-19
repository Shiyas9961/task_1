import React, { useEffect, useState } from 'react'
import { authenticate } from '../authenticate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, loginFail, loginRequest, loginSuccess } from '../slices/authSlice'
import Loader from './Loader'

const Signin = () => {
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { accessToken, idToken, error, loading } = useSelector(state => state.authState)
  const navigate = useNavigate()


  //console.log(accessToken)

  useEffect(() => {
    if(idToken && accessToken){
      navigate('/')
    }
  },[idToken, navigate, accessToken])

  const handleSubmit = async (event) => {
      event.preventDefault()
      dispatch(clearError())
      try{
        dispatch(loginRequest())
        const data = await authenticate(email, password)
        console.log(data)
        dispatch(loginSuccess(
            {
              idToken : data.idToken.jwtToken, 
              accessToken : data.accessToken.jwtToken,
              refreshToken : data.refreshToken.token
            }))
        //localStorage.setItem('tokens', JSON.stringify({idToken : data.idToken.jwtToken, accessToken : data.accessToken.jwtToken}))
      }catch(error){
        dispatch(loginFail(error.message))
        console.log(error.message)
      }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    dispatch(clearError())
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    dispatch(clearError())
  }

  if(loading){
    return <Loader/>
  }

  return (
        <div className="center-page d-flex flex-column align-items-center justify-content-center">
          {
            error ? <p className='text-danger'>{error}</p> : null
          }
          <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center gap-3'>
            <h1>Login</h1>
            <div className='form-group'>
              <label htmlFor="email" className='mb-2'>Username : </label>
              <input 
                type="text" 
                id='email'  
                value={email} 
                className='form-control border border-secondary'
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="password" className='mb-2'>Password : </label>
              <input 
                type="password" 
                id='password'  
                value={password}
                className='form-control border border-secondary' 
                onChange={(e) => handlePasswordChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-primary'>Login</button>
        </form>
        </div>
  )
}

export default Signin