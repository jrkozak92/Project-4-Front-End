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
      <div>
        <p onClick={() => handleSelection('account')}>Account</p>
        { selection === 'account' ?
          <Login handleCreateUser={props.handleCreateUser} handleLogin={props.handleLogin} user={props.user} currentUser={props.currentUser} loginMessage={props.loginMessage} toggleLogout={props.toggleLogout} loggedIn={props.loggedIn} handleDeleteUser={props.handleDeleteUser}/>
            :
          null
        }
      </div>
    </div>
  )
}

export default Nav
