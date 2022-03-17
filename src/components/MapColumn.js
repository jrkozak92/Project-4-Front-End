import Edit from './Edit'
import '../App.css'

const MapColumn = (props) => {

    return(
       <div className='mapColumn'>
            <h2>{props.title}</h2>
            {props.todos.map((todo,i) => {
            return(
                <div className='todoCard' key={i}> 
                <h5>{todo.title}</h5> 
                <p>{todo.task}</p>
                <Edit todo={todo} handleUpdate={props.handleUpdate}  />
                <button onClick={props.handleDelete}  value={todo.id} > Delete</button>
                </div>
            )
            })}
       </div>
    )
}


export default MapColumn


