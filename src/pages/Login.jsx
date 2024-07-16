import {useState} from 'react'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service.js'
import { login, signup } from '../../store/actions/user.action.js'
import { useNavigate } from 'react-router-dom'


function getEmptyCredentials() {
  return {
    fullname: '',
    username: 'muki',
    password: 'muki',
  }
}

export function LoginSignup() {
  const [credentials, setCredentials] = useState(getEmptyCredentials())
  const [isSignupState, setIsSignupState] = useState(false)
  const navigate = useNavigate()
  function handleCredentialsChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials((credentials) => ({...credentials, [field]: value}))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (isSignupState) {
      try {
        const user = await signup(credentials)
        showSuccessMsg(`Welcome ${user.fullname}`)
      } catch (err) {
        showErrorMsg('Cannot signup')
      }
    } else {
      try {
        const user = await login(credentials)
        showSuccessMsg(`Hi again ${user.fullname}`)
      } catch (err) {
        showErrorMsg('Cannot login')
      }
    }
    navigate('/')

  }

  function onToggleSignupState() {
    setIsSignupState((isSignupState) => !isSignupState)
  }

  const {username, password, fullname} = credentials

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username"
          onChange={handleCredentialsChange}
          required
          autoFocus
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleCredentialsChange}
          required
        />

        {isSignupState && (
          <input
            type="text"
            name="fullname"
            value={fullname}
            placeholder="Full name"
            onChange={handleCredentialsChange}
            required
          />
        )}

        <button>{isSignupState ? 'Signup' : 'Login'}</button>
      </form>

      <div className="btns">
        <a href="#" onClick={onToggleSignupState}>
          {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}

