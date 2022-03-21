import {useState} from 'react'

const Lists = (props) => {
  const [currentList, setCurrentList] = useState(props.currentList)
  const [newList, setNewList] = useState("")

  const handleChange = (event) => {
      setNewList(event.target.value)
  }

  const handleListChange = (nextList) => {
      props.handleListChange(nextList.list)
  }

  const handleAddList = (event, newList) => {
    event.preventDefault()
    console.log('newList at Lists level: ', newList);
    props.handleAddList(newList)
  }

  return (
    <div>
      <ul>
        { props.lists.map((list, i) => {
          return <li key={"list" + i} onClick={()=>handleListChange({list})}>
              {list}
            </li>
          })
        }
      </ul>
      <form onSubmit={(event)=>{handleAddList(event, newList)}}>
        <input type="text" onChange={handleChange} value={newList}/>
        <input type="submit" value="Add List"/>
      </form>
    </div>
  )
}

export default Lists
