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
    
    // INSUFFICENT RESOURECES  IF NOT IN USE EFFECT. BUT...
  // NEED TWO USE EFFECT SO I DON'T HAVE TO RESET EVERY TIME I WANT TO UPDATE
    useEffect(
        () => {
          socketRef.current = io.connect("https://shielded-caverns-61802.herokuapp.com/")
          
          return () => socketRef.current.disconnect()
        },
        []
        )
      
    useEffect(() => {
          // using once instead of .on in case I send too many listners and it stacks.s
          socketRef.current.once("message", (response) => {
            // console.log(chat);
            setChat([ ...chat,  response])
          })
    },[chat])


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