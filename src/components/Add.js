import {useState} from 'react'


const Add = (props) => {
    let emptyTodo = { title: '', task: '' }
    const [newTodo, setnewTodo] = useState(emptyTodo)

    const handleChange = (event) => {
        setnewTodo({ ...newTodo, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(newTodo)
    }

    return (
        
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" onChange={handleChange} value={newTodo.title} required />
          <br />
          <br />
          <label htmlFor="task">Task: </label>
          <input type="text" name="task"  onChange={handleChange} value={newTodo.task} required/>
          <input type="submit"/>
        </form>
      </>
    )
  }
  
  export default Add