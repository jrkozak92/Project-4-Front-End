import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css';

function App() {
  let [todos, setTodos] = useState([])

  const getTodos = async () => {
    try{
    const allTodos = await axios.get('https://protected-woodland-92722.herokuapp.com/api/todo')
    setTodos(allTodos.data)
    } catch (error){
      console.error(error)
    }
  }
  const handleCreate = async (createTodo) => {
    try{
      const idk = await axios.post('https://protected-woodland-92722.herokuapp.com/api/todo',createTodo )
      getTodos()
    } catch (error){
      console.error(error)
    }
  }

  const handleDelete = async (event) => {
    const idk = await axios.delete('https://protected-woodland-92722.herokuapp.com/api/todo/'+ event.target.value )
    getTodos()
  }

  const handleUpdate = async (edit) => {
    const idk = await axios.put('https://protected-woodland-92722.herokuapp.com/api/todo/'+edit.id, edit  )
    getTodos()
  }

  useEffect(() => {
    getTodos()
  },[])

  return (
    <div>
    <h1>Hi</h1>

    <Add handleCreate={handleCreate}/>

    {todos.map((todo,i) => {
      return(
        <div key={i}> 
        <h1>{todo.title}</h1> 
        <h2>{todo.task}</h2>
        <Edit todo={todo} handleUpdate={handleUpdate} />
        <button onClick={handleDelete}  value={todo.id} > Delete</button>
        </div>
      )
    })}
    </div>
  );
}

export default App;
