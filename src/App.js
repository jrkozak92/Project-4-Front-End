import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import MapColumn from './components/MapColumn'
import './App.css';
const herokuSite = 'https://protected-woodland-92722.herokuapp.com/api/todo'
const localHost = 'http://localhost:8000/api/todo'

function App() {
  const [todos, setTodos] = useState(
    {needTodo:[],
    doingTodo:[],
    doneTodo:[]}
  ) 

  const getTodos = async () => {
    try{
    const allTodos = await axios.get(localHost)
    const needTodo = allTodos.data.filter((t) => { return t.todo_choices == 'todo'})
    const doingTodo = allTodos.data.filter((t) => { return t.todo_choices == 'doing'})
    const doneTodo = allTodos.data.filter((t) => { return t.todo_choices == 'done'})
    setTodos({
      needTodo:needTodo,
      doingTodo:doingTodo,
      doneTodo:doneTodo
    })
    } catch (error){
      console.error(error)
    }  
  }
  const handleCreate = async (createTodo) => {
    try{
      const idk = await axios.post(localHost,createTodo )
      getTodos()
    } catch (error){
      console.error(error)
    }
  }

  const handleDelete = async (event) => {
    const idk = await axios.delete(localHost+'/'+ event.target.value )
    getTodos()
  }

  const handleUpdate = async (edit) => {
    const idk = await axios.put(localHost+'/'+edit.id, edit)
    getTodos()
  }

  useEffect(() => {
    getTodos()
  },[])

  return (
    <div>
    <h1>Hi</h1>

    <Add handleCreate={handleCreate}/>
    <div className='mapColumnDiv'>
    <MapColumn title="TODO"  todos={todos.needTodo}  handleUpdate={handleUpdate} handleDelete={handleDelete} />
    <MapColumn title="DOING" todos={todos.doingTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    <MapColumn title="DONE" todos={todos.doneTodo} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
    </div>
  );
}

export default App;
