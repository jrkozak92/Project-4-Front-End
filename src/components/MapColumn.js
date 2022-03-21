import { useState } from "react";
import Edit from "./Edit";
import "../App.css";

const MapColumn = (props) => {
  const [showForm, setShowForm] = useState();

  const toggleShowForm = (todoId) => {
    if (todoId === showForm) {
      setShowForm("");
    } else {
      setShowForm(todoId);
    }
  };

  return (
    <div className="mapColumn">
      <h2 className="lid">{props.title}</h2>
      {props.todos.map((todo, i) => {
        return (
          <div className="todoCard" key={i}>
            <h5
              onClick={() => {
                toggleShowForm(todo.id);
              }}
              style={{ fontSize: "1.5rem" }}
            >
              {todo.title}
            </h5>
            <p>{todo.task}</p>
            {showForm === todo.id ? (
              <>
                <Edit todo={todo} handleUpdate={props.handleUpdate} />
                <button onClick={props.handleDelete} value={todo.id} style={{ margin: "1.25rem", backgroundColor: "rgb(19, 39, 67)", color: "rgb(215,56,94", borderRadius: "15px", fontSize: "1rem", padding: "4px 7px" }}>
                  {" "}
                  Delete
                </button>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default MapColumn;
