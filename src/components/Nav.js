import {useState} from 'react'
import Login from './Login'

const Nav = (props) => {
  const [selection, setSelection] = useState('')

  const handleSelection = (selected) => {
    if (selected === selection){
      setSelection('')
    } else {
      setSelection(selected)
    }
  }

  return (
    <div className="nav-bar">
      <div onClick={() => handleSelection('account')}>
        Account
        { selection === 'account' ?
          <Login handleCreateUser={props.handleCreateUser} handleLogin={props.handleLogin} user={props.currentUser} loginMessage={props.loginMessage} toggleLogout={props.toggleLogout} loggedIn={props.loggedIn}/>
            :
          null
        }
      </div>
    </div>
  )
}

export default Nav
