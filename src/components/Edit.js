import { useState } from "react";

const Edit = (props) => {
  const [editTodo, setEditTodo] = useState({ ...props.todo });

  const handleChange = (event) => {
    setEditTodo({ ...editTodo, [event.target.name]: event.target.value });
    console.log(editTodo.todo_choices);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdate(editTodo);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" style={{ color: "rgb(19,39,67)" }}>
          Title:{" "}
        </label>
        <input type="text" name="title" onChange={handleChange} value={editTodo.title} style={{ backgroundColor: "rgb(248,239,212)" }} />
        <br />
        <br />
        <label htmlFor="task" style={{ color: "rgb(19,39,67)", marginLeft: "3.30rem" }}>
          Task:{" "}
        </label>
        <input type="text" name="task" onChange={handleChange} value={editTodo.task} style={{ backgroundColor: "rgb(248,239,212)" }} />
        <select name="todo_choices" onChange={handleChange} value={editTodo.todo_choices} style={{ backgroundColor: "rgb(248,239,212)", color: "rgb(215,56,94)" }}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <br />
        <input type="submit" style={{ marginTop: "1rem", backgroundColor: "rgb(19, 39, 67)", color: "#fff", borderRadius: "15px", fontSize: "1rem", padding: "4px 7px" }} />
      </form>
    </>
  );
};
// {editTodo.todo_choices === 'todo' ?  "selected='selected'" : null}
export default Edit;
