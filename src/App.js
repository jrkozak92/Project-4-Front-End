import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./components/Add";
import Edit from "./components/Edit";
import MapColumn from "./components/MapColumn";
import Nav from "./components/Nav";
import GlobalChat from "./components/GlobalChat";
import "./App.css";

const herokuSite = "https://protected-woodland-92722.herokuapp.com/api/todo";
const localHost = "http://localhost:8000/api/todo";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [currentUser, setCurrentUser] = useState({ id: "", username: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState({username: '', password: ''})
  const [currentUser, setCurrentUser] = useState({id: '', username: '', list_names: '', requests: ''})
  const [loginMessage, setLoginMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [lists, setLists] = useState([""])
  const [currentList, setCurrentList] = useState('global')

  const [todos, setTodos] = useState(
    {needTodo:[],
    doingTodo:[],
    doneTodo:[]}
  )


  const [listSpecificTodos, setListSpecificTodos] = useState(todos)

  const getTodos = async () => {
    try {
      const allTodos = await axios.get(herokuSite);
      const needTodo = allTodos.data.filter((t) => {
        return t.todo_choices == "todo";
      });
      const doingTodo = allTodos.data.filter((t) => {
        return t.todo_choices == "doing";
      });
      const doneTodo = allTodos.data.filter((t) => {
        return t.todo_choices == "done";
      });
      setTodos({
        needTodo: needTodo,
        doingTodo: doingTodo,
        doneTodo: doneTodo,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleCreate = async (createTodo) => {
    try{
      createTodo.list_name = currentList
      const idk = await axios.post(localHost, createTodo)
      getTodos()
    } catch (error){
      console.error(error)
    }
  };

  const handleDelete = async (event) => {
    const idk = await axios.delete(herokuSite + "/" + event.target.value);
    getTodos();
  };

  const handleUpdate = async (edit) => {
    const idk = await axios.put(herokuSite + "/" + edit.id, edit);
    getTodos();
  };

  const handleCreateUser = (user) => {
    axios
      .post("https://protected-woodland-92722.herokuapp.com/api/user", user)
      .then(
        (response) => {
          response.data = {id: response.data.id, username: response.data.username, list_names: '', requests: ''}
          setCurrentUser(response.data)
          setLoginMessage('')
          toggleLogout()
          setLists(["personal-" + response.data.id])
          setCurrentList("personal-" + response.data.id)
          handleListChange("personal-" + response.data.id)
        },
        (error) => {
          console.error("Then Error: ", error.toJSON());
          setLoginMessage("Username Already Exists");
        }
      )
      .catch((error) => {
        console.error("Catch Error: ", error.toJSON());
      });
  };
  const handleDeleteUser = () => {
    axios
      .delete('http://localhost:8000/api/user/' + currentUser.id)
      .then(
        (response) => {
          toggleLogout()
        },
        (error) => {
          console.error('Delete Refused: ', error.toJSON())
        }
    )
  }

  const handleLogin = (user) => {
    axios
      .put('http://localhost:8000/api/user/login', user)
      .then(
        (response) => {
          if (response.data.username){
            console.log(response.data);
            response.data = {id: response.data.id, username: response.data.username, password: response.data.password, list_names: response.data.list_names, requests: response.data.requests}
            setLists(response.data.list_names)
            if (response.data.list_names) {
              console.log('list_names exists: ', response.data.list_names);
              const listsArray = response.data.list_names.split(', ')
              console.log('listsArray: ', listsArray, '[0]: ', listsArray[0]);
              setLists(listsArray)
              setCurrentList(listsArray[0])
              handleListChange(listsArray[0])
            } else {
              console.log('list_names does not exist: ', response.data.list_names);
              response.data.list_names = null
              setLists(["personal-" + response.data.id])
              setCurrentList("personal-" + response.data.id)
              handleListChange("personal-" + response.data.id)
            }
            setCurrentUser(response.data)
            setLoginMessage('')
            toggleLogout()

          } else {
            setLoginMessage('Username or Password Incorrect')
            setCurrentUser(response.data)
          }
        },
        (error) => {
          setLoginMessage('Username or Password Incorrect')
        }
      },
      (error) => {
        setLoginMessage("Username or Password Incorrect");
      }
    );
  };

  const toggleLogout = () => {
    if (loggedIn ) {
      setLoggedIn(!loggedIn)
      setUser({username: '', password: ''})
      setCurrentUser({id: '', username: ''})
      setLists(["global"])
      setCurrentList("global")
      setListSpecificTodos(todos)
      handleListChange("global")
    } else {
      setLoggedIn(!loggedIn);
    }
  };

  const handleListChange = (updatedList) => {
    setCurrentList(updatedList)
    const needTodo = todos.needTodo.filter((t) => { return t.list_name == currentList})
    const doingTodo = todos.doingTodo.filter((t) => { return t.list_name == currentList})
    const doneTodo = todos.doneTodo.filter((t) => { return t.list_name == currentList})
    setListSpecificTodos({
      needTodo:needTodo,
      doingTodo:doingTodo,
      doneTodo:doneTodo
    })
  }

  const handleAddList = (newList) => {
    newList += String("-" + currentUser.id)
    const listList = [...lists, newList]
    const updatedUser = {username: currentUser.username, list_names: ''}
    updatedUser.list_names = listList.join(", ")
    console.log("updateUser + listList at App level: ", updatedUser)
    axios
      .put('http://localhost:8000/api/user/listupdate', updatedUser)
      .then(
        (response) => {
          setLists(listList)
          setCurrentList(newList)
          handleListChange(newList)
        },
        (error) => {
          console.log(error)
          console.error('Problem adding List: ', error)
        }
      )
  }

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    handleListChange(currentList)
  }, [todos, currentList, lists])

  return (
    <div className="container">
     

      <Nav handleCreateUser={handleCreateUser} handleLogin={handleLogin} user={user} currentUser={currentUser} loginMessage={loginMessage} toggleLogout={toggleLogout} loggedIn={loggedIn} handleDeleteUser={handleDeleteUser} lists={lists} currentList={currentList} handleAddList={handleAddList} handleListChange={handleListChange}/>
      <h1 style={{ marginTop: "3rem", color: "rgb(19,39,67)" }}>Hi{` ${currentUser.username}`}</h1>

        <div className="globalChat">
          
        <GlobalChat user={currentUser}/>
     </div>
      
      
        <div>
          <Add handleCreate={handleCreate} currentList={currentList}/>
          <div className="mapColumnDiv" style={{ marginLeft: "30px", marginRight: "30px" }}>
            <MapColumn title="TODO" todos={listSpecificTodos.needTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <MapColumn title="DOING" todos={listSpecificTodos.doingTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
            <MapColumn title="DONE" todos={listSpecificTodos.doneTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          </div>
        </div>
    </div>
  );
}

export default App;
