import axios from 'axios'
import { useState, useContext, useRef, useEffect } from 'react'
import AuthContext from '../contexts/AuthProvider'
import { useLocation, useNavigate, } from "react-router";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const userRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = localStorage.getItem('user')
  useEffect(()=> {
      if(userdata) {
        navigate('/dashboard')
      }
  }, [])
  useEffect(() => {
    userRef.current.focus()
  }, [])
  useEffect(() => {
    setErrorMessage('');
  }, [email, password])


  const handleSubmit = (e) => {
    e.preventDefault();
      try{
        axios.post('http://localhost:8000/api/login',
        JSON.stringify({ email, password }),
        {
          headers: {
            'Content-type': 'application/json'
          }
        }).then((response) => {
          setSuccess(true)
          setEmail('')
          setPassword('')
          //console.log(res)
         
          const data = JSON.stringify(response.data)
          localStorage.setItem("user", data)
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate('/dashboard')
          }
        }).catch((error)=> {
          if (error.response.status === 400) {
            setErrorMessage('No server response')
          } else if (error.response.status === 401) {
            setErrorMessage('Invalid username or password')
            errorRef.current.focus()
          } else {
            setErrorMessage('Login failed')
          }
        
        });
      }catch(err) {
      }
       

      //console.log(JSON.stringify(res))

  }

  return (
    <>
      <h2>Login</h2>
      {errorMessage ? <p style={{ color: 'red' }} ref={errorRef} aria-live='assertive'>{errorMessage} </p> : ''}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor='email'>Email</label>
          <input type='text' ref={userRef} placeholder="email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
        </div>
        <div className="formGroup">
          <label htmlFor='password'>Password</label>
          <input type='password' placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
        </div>
        <button type="submit">Login</button>
        <a href='http://localhost/password/reset'>Password Reset</a>
      </form>
    </>
  )
}

export default Login