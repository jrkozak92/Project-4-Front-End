import {useState, useEffect} from 'react'

const Login = (props) => {
  const [user, setUser] = useState({...props.user})
  const [accountCreate, setAccountCreate] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const handleCreateUser = (event) => {
    event.preventDefault()
    console.log('Login User: ', user);
    props.handleCreateUser(user)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    props.handleLogin(user)
  }

  const handleLogout = (event) => {
    props.toggleLogout()
    setUser({...props.user})
  }

  const toggleShowSettings = () => {
    setShowAccountSettings(!showAccountSettings)
  }

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm)
  }

  return (
    <>
      { props.loggedIn ?
        <>
          { !showAccountSettings ?
            <>
              <button onClick={handleLogout}>Logout</button><br/>
              <button onClick={toggleShowSettings}>Account Settings</button><br/>
            </>
              :
            <>
              <button onClick={props.handleDeleteUser}>Delete Account</button><br/>
              { showPasswordForm ?
                <>
                  <form onSubmit={(event)=> props.handleUpdatePassword(event)}>
                    <input type="password" name="newPassword" onChange={handleChange} value={user.password}/><br/>
                    <input type="submit" value="Update Password"/>
                  </form>
                  <button onClick={togglePasswordForm}>Cancel</button>
                </>
                  :
                <>
                  <button onClick={togglePasswordForm}>Change Password</button>
                </>
              }
              <br/>
              <br/>
              <button onClick={toggleShowSettings}>Back</button>
            </>
          }
        </>
          :
        <>
          { accountCreate ?
            <>
              <h5>Create Account</h5>
              <form onSubmit={handleCreateUser}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                <input type="text" name="password" placeholder="Password" onChange={handleChange}/>
                <p>{props.loginMessage}</p>
                <input type="submit" value="Create Account"/>
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)}>I have an Account</button>
            </>
              :
            <>
              <h5>Login</h5>
              <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                <input type="text" name="password" placeholder="Password" onChange={handleChange}/>
                <p>{props.loginMessage}</p>
                <input type="submit" value="Login"/>
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)}>I don't have an Account</button>
            </>
          }
        </>
      }
    </>



  )
}

export default Login
