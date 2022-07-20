import axios from 'axios'
import { useState, useContext, useRef, useEffect } from 'react'
import AuthContext from '../contexts/AuthProvider'
import { useLocation, useNavigate, } from "react-router";
import { userStore } from '../stores/UserStore';
import { login, catchErrors } from '../Utilities/Utilities'
import { useForm } from "react-hook-form";
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const userRef = useRef()
  const errorRef = useRef()
  const navigate = useNavigate();
  const location = useLocation();
  const userdata = localStorage.getItem('user')
  const setUser = userStore((state) => state.setUser)
  const getUser = userStore((state) => state.getUser)
  const user = userStore((state) => state.user)
  const { register, formState: { errors }, handleSubmit, watch } = useForm();


  useEffect(() => {
    if (!userdata) return
    if (userdata) {
      navigate('/dashboard')
    }
  }, [location, userdata])



  const onSubmit = async (data) => {

    catchErrors(
    login(data)
      .then((response) => {
        const data = JSON.stringify(response.data)
        localStorage.setItem("user", data)
        setSuccess(true)
        setEmail('')
        setPassword('')
        //console.log(res)
      }).then(() => {
        getUser();

      }).finally(() => {
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate('/dashboard')
        }
      }).catch((error) => {
        console.log(`fucking error ${error}`)


      })
    )
}

//console.log(JSON.stringify(res))



return (
  <div className='login-page'>
    <div className='login-wrapper'>
      <h1>Login</h1>
      {errorMessage && errorMessage}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formGroup">
          <label className='loginLabel' htmlFor='email'>Email</label>
          <input type='email' autoFocus={true} placeholder="email" name='email'  {...register("email", { required: true })} autoComplete='off' />
        </div>
        <div className="formGroup">
          <label className='loginLabel' htmlFor='password'>Password</label>
          <input type='password' placeholder="password" name='password' {...register("password", { required: true })} autoComplete='off' />
        </div>

        <div className='actionButtons'>

          <button type="submit" className='loginBtn'>Login</button>
          <a type="submit" className='forgotBtn'>Forgot Password</a>

        </div>
      </form>
    </div>
  </div>
)
}

export default Login