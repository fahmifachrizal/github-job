import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../stores/actionCreator';
import { useDispatch } from 'react-redux';

const RegisterPage = function(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [buttonState, setButtonState] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayError, setdisplayError] = useState({password:null, username:null, confirmPassword:null})

  useEffect(()=>{
    (password==confirmPassword&&password.length&&confirmPassword.length)?setButtonState(true):setButtonState(false)
  },[password, confirmPassword])

  const handleRegister = async (e) => {
    e.preventDefault()
    const { data, error } = await dispatch(postRegister(username, password))
    if(!data){
      setdisplayError({password:error.message.password?error.message.password:null, username:error.message.username?error.message.username:null, confirmPassword:null})
    } else {
      navigate('/login')
    }
  }
  useEffect(()=>{
    if(displayError.password||displayError.username||displayError.confirmPassword){
      setButtonState(false)
    }
  },[displayError])


  return (
    <div className="bg-gray-200 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center uppercase">Register</h1>
        <form className="mt-6" onSubmit={handleRegister}>
          <div className="mb-2">
            <label htmlFor="username" className={`block text-sm font-semibold ${displayError.username?'text-red-800':'text-gray-800'}`}>Username {displayError.username?`(${displayError.username})`:''}</label>
            <input type="text" className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md  ${displayError.username?'focus:ring-red-300 focus:border-red-400 border-red-500':'focus:ring-blue-300 focus:border-blue-400'} focus:outline-none focus:ring focus:ring-opacity-40`} autoComplete='off'
              onChange={(e) => {
                setdisplayError({password:null, username:null, confirmPassword:null})
                setUsername(e.target.value)
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className={`block text-sm font-semibold ${displayError.password?'text-red-800':'text-gray-800'}`}>Password {displayError.password?`(${displayError.password})`:''}</label>
            <input type="password" className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md  ${displayError.password?'focus:ring-red-300 focus:border-red-400 border-red-500':'focus:ring-blue-300 focus:border-blue-400'} focus:outline-none focus:ring focus:ring-opacity-40`} autoComplete='off'
              onChange={(e) => {
                setdisplayError({password:null, username:null, confirmPassword:null})
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className={`block text-sm font-semibold ${displayError.password?'text-red-800':'text-gray-800'}`}>Confirm Password</label>
            <input type="password" className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md  ${displayError.password?'focus:ring-red-300 focus:border-red-400 border-red-500':'focus:ring-blue-300 focus:border-blue-400'} focus:outline-none focus:ring focus:ring-opacity-40`} autoComplete='off'
              onChange={(e) => {
                setdisplayError({password:null, username:null, confirmPassword:null})
                setConfirmPassword(e.target.value)
              }}
            />
          </div>
          <div className="mt-6">
            {
              !buttonState ? 
              <div className={`flex justify-center select-none w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md`}>Register</div>:
              <button type='submit' className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Register</button>
            }
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}Already had account?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>
  </div>

  );
}

export default RegisterPage;