import { useState } from "react";

const Add = (props) => {
  let emptyTodo = { title: "", task: "" };
  const [newTodo, setnewTodo] = useState(emptyTodo);

  const handleChange = (event) => {
    setnewTodo({ ...newTodo, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreate(newTodo);
  };

  return (
    <>
      <div className="add">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" onChange={handleChange} value={newTodo.title} required style={{ backgroundColor: "rgb(248,239,212)", borderRadius: "5px", padding: "3px" }} />
          <br />
          <br />
          <label htmlFor="task">Task: </label>
          <input type="text" name="task" onChange={handleChange} value={newTodo.task} required style={{ backgroundColor: "rgb(248,239,212)", borderRadius: "5px", padding: "3px" }} />
          <br />
          <input type="submit" style={{ backgroundColor: "rgb(19, 39, 67)", color: "#fff", marginTop: "1rem", borderRadius: "15px", fontSize: "1rem", padding: "4px 7px" }} />
        </form>
      </div>
    </>
  );
};

export default Add;
