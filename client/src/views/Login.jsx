import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postLogin } from '../stores/actionCreator';
import { useNavigate } from 'react-router-dom'

const LoginPage = function(){
  const dispatcher = useDispatch()
  const navigate = useNavigate()
  const [buttonState, setButtonState] = useState(false)
  const [displayError, setdisplayError] = useState({password:null, username:null})
  const [dataLogin, setDataLogin] = useState({
    username: '',
    password: ''
  })

  useEffect(()=>{
    (dataLogin.password.length&&dataLogin.username.length)?setButtonState(true):setButtonState(false)
  },[dataLogin])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data, error } = await dispatcher(postLogin(dataLogin))
    if(!data){
      setdisplayError({password:error.message, username:error.message})
    } else {
      navigate('/login')
    }
  }

  useEffect(()=>{
    if(displayError.password||displayError.username){
      setButtonState(false)
    }
  },[displayError])

  return (
    <div className="bg-gray-200 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl ring-blue-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center uppercase">Sign in</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-2">
              <label htmlFor="username" className={`block text-sm font-semibold ${displayError.username?'text-red-800':'text-gray-800'}`}>Username {displayError.username?`(${displayError.username})`:''}</label>
              <input type="text" className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md  ${displayError.username?'focus:ring-red-300 focus:border-red-400 border-red-500':'focus:ring-blue-300 focus:border-blue-400'} focus:outline-none focus:ring focus:ring-opacity-40`}
                onChange={ (event) => {
                  setdisplayError({password:null, username:null})
                  setDataLogin({
                    ...dataLogin,
                    username:event.target.value
                  })
                }}
              />
          </div>
          <div className="mb-2">
              <label htmlFor="password" className={`block text-sm font-semibold ${displayError.password?'text-red-800':'text-gray-800'}`}>Password {displayError.password?`(${displayError.password})`:''}</label>
              <input type="password" className={`block w-full px-4 py-2 mt-2 bg-white border rounded-md  ${displayError.password?'focus:ring-red-300 focus:border-red-400 border-red-500':'focus:ring-blue-300 focus:border-blue-400'} focus:outline-none focus:ring focus:ring-opacity-40`}
                onChange={ (event) => {
                  setdisplayError({password:null, username:null})
                  setDataLogin({
                    ...dataLogin,
                    password:event.target.value
                  })
                }}
              />
          </div>
          <div className="mt-6">
            {
              !buttonState ? 
              <div className={`flex justify-center select-none w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md`}>Log In</div>:
              <button type='submit' className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>Log In</button>
            }
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}Don't have an account?{" "}
          <a href="/register" className="font-medium text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
  </div>

  );
}

export default LoginPage;