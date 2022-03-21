import {useState} from 'react'
import Login from './Login'
import Lists from './Lists'

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
      { props.loggedIn ?
        <div>
          <p onClick={() => handleSelection('lists')}>Lists</p>
          { selection === 'lists' ?
            <Lists user={props.user} currentUser={props.currentUser} lists={props.lists} currentList={props.currentList} handleAddList={props.handleAddList}  handleListChange={props.handleListChange}/>
              :
            null
          }
        </div>
         :
        null
      }

    </div>
  )
}

export default Nav
