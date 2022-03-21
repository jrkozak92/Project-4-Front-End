import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./components/Add";
import Edit from "./components/Edit";
import MapColumn from "./components/MapColumn";
import Nav from "./components/Nav";

import "./App.css";
const herokuSite = "https://protected-woodland-92722.herokuapp.com/api/todo";
const localHost = "http://localhost:8000/api/todo";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [currentUser, setCurrentUser] = useState({ id: "", username: "" });
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [todos, setTodos] = useState({ needTodo: [], doingTodo: [], doneTodo: [] });

  const getTodos = async () => {
    try {
      const allTodos = await axios.get(localHost);
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
  };
  const handleCreate = async (createTodo) => {
    try {
      const idk = await axios.post(localHost, createTodo);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (event) => {
    const idk = await axios.delete(localHost + "/" + event.target.value);
    getTodos();
  };

  const handleUpdate = async (edit) => {
    const idk = await axios.put(localHost + "/" + edit.id, edit);
    getTodos();
  };

  const handleCreateUser = (user) => {
    axios
      .post("http://localhost:8000/api/user", user)
      .then(
        (response) => {
          response.data = { id: response.data.id, username: response.data.username };
          console.log(response.data);
          setCurrentUser(response.data);
          setLoginMessage("");
          toggleLogout();
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
    axios.delete("http://localhost:8000/api/user/" + currentUser.id).then(
      (response) => {
        toggleLogout();
      },
      (error) => {
        console.error("Delete Refused: ", error.toJSON());
      }
    );
  };

  const handleLogin = (user) => {
    axios.put("http://localhost:8000/api/user/login", user).then(
      (response) => {
        if (response.data.username) {
          response.data = { id: response.data.id, username: response.data.username };
          setCurrentUser(response.data);
          setLoginMessage("");
          toggleLogout();
        } else {
          setLoginMessage("Username or Password Incorrect");
          setCurrentUser(response.data);
        }
      },
      (error) => {
        setLoginMessage("Username or Password Incorrect");
      }
    );
  };

  const toggleLogout = () => {
    if (loggedIn) {
      setLoggedIn(!loggedIn);
      setUser({ username: "", password: "" });
      setCurrentUser({ id: "", username: "" });
    } else {
      setLoggedIn(!loggedIn);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <Nav handleCreateUser={handleCreateUser} handleLogin={handleLogin} user={user} currentUser={currentUser} loginMessage={loginMessage} toggleLogout={toggleLogout} loggedIn={loggedIn} handleDeleteUser={handleDeleteUser} />
      <h1 style={{ marginTop: "3rem", color: "rgb(19,39,67)" }}>Hi {currentUser.username}</h1>
      <Add handleCreate={handleCreate} />
      <div className="mapColumnDiv" style={{ marginLeft: "30px", marginRight: "30px" }}>
        <MapColumn title="TODO" todos={todos.needTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        <MapColumn title="DOING" todos={todos.doingTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        <MapColumn title="DONE" todos={todos.doneTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
