import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "../App.css"

function GlobalChat(props) {
	const [ msg, setMsg ] = useState("")
	const [ chat, setChat ] = useState([])
	const [ showChat, setShowChat ] = useState(false)
  const [currentUser, setCurrentUser] = useState(props.user)
    const socketRef = useRef()
  // const socket = io.connect("http://localhost:4000")

	const handleChange = (e) => {
		setMsg(e.target.value )
    setCurrentUser(props.user)
	}

	const onMessageSubmit = (e) => {
    e.preventDefault()
		socketRef.current.emit("message", msg, currentUser.username)
    e.target.reset()
		setMsg("")
	}

	const renderChat = () => {
		return chat.map(( message , index) => (
			<div className="entireChat" key={index}>
				<p className="message">
					<span><strong> {message.name}</strong> </span>: <span>{message.message}</span>
				</p>
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
          socketRef.current.once("message", (resMsg, resName) => {
            setChat([ ...chat,  {name: resName, message: resMsg}])
          })
    },[chat])


  return(
    <div className="globalChatDiv">
			{ showChat ?
				<>
					{renderChat()}
		      <form onSubmit={onMessageSubmit}>
		        <input onChange={handleChange}/>
		        <input type="submit" />
		      </form>
					<p onClick={()=>setShowChat(!showChat)}>Hide Chat</p>
				</>
					:
				<>
					<div>
						<h3 onClick={()=>setShowChat(!showChat)}>Chat</h3>
					</div>
				</>
			}
    </div>
  )


}

export default GlobalChat
