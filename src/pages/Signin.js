import React, { Fragment, useContext, useEffect, useState } from 'react'
import { authenticate } from '../authenticate'
import { GlobalContext } from '../context/globalContext'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAccessToken, accessToken } = useContext(GlobalContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(accessToken){
      navigate('/')
    }
  },[accessToken, navigate])

  const handleSubmit = async (event) => {
      event.preventDefault()
      setErr('')
      try{
        setLoading(true)
        const data = await authenticate(email, password)
        console.log(data)
        setLoading(false)
        setAccessToken(data.accessToken)
      }catch(error){
        setErr(error.message)
        setLoading(false)
        console.log(error)
      }
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <Fragment>
        {
          err ? <p className='errClass'>{err}</p> : null
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