import {useState} from 'react'


const Edit = (props) => {
    const [editTodo, setEditTodo] = useState({...props.todo})

    const handleChange = (event) => {
        setEditTodo({ ...editTodo, [event.target.name]: event.target.value })
        console.log(props.todo);
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(editTodo)
    }

    return (
        
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" onChange={handleChange} value={editTodo.title} />
          <br />
          <br />
          <label htmlFor="task">Task: </label>
          <input type="text" name="task"  onChange={handleChange} value={editTodo.task}/>
          <select name="todo_choices" onChange={handleChange}>
            <option value="todo" >Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <input type="submit"/>
        </form>
      </>
    )
  }
  
  export default Edit