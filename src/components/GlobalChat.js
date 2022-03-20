import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

function GlobalChat() {
	const [ msg, setMsg ] = useState("")
	const [ chat, setChat ] = useState([])
    const socketRef = useRef()
  // const socket = io.connect("http://localhost:4000")
	

	const handleChange = (e) => {
		setMsg(e.target.value )
	}

	const onMessageSubmit = (e) => {
    e.preventDefault()
		socketRef.current.emit("message", msg)
    e.target.reset()
		setMsg("")
	}

	const renderChat = () => {
		return chat.map(( message , index) => (
			<div key={index}>
				<h3>
					 <span>{message}</span>
				</h3>
			</div>
		))
	}
    
  useEffect(
  () => {
    socketRef.current = io.connect("http://localhost:4000")
    socketRef.current.on("message", (response) => {
      setChat([ ...chat,  response])
    })
    return () => socketRef.current.disconnect()
  },
  [chat]
  )


  return(
    <div>
      <form onSubmit={onMessageSubmit}>
        <input onChange={handleChange}/>
        <input type="submit" />
      </form>
      {renderChat()}
    </div>
  )

	
}

export default GlobalChat