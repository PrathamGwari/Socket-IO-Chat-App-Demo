import {React, useState, useRef, useEffect} from 'react'
import { io } from "socket.io-client";

function App() {
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const messageInput = useRef();
  const socketIdInput = useRef();
  const [mySocketId, setMySocketId] = useState("");

  useEffect(() => {
    console.log('connecting')
    socket.current = io('ws://localhost:8000')
    socket.current.on('getMySocketId', (id)=>{
      setMySocketId(id);
    })

    socket.current.on('getMessage', (newMessage)=>{
      
      const newMessagesArray = messages.length === 0 ? [newMessage] : [...messages, newMessage]
      
      console.log(`got new message ${newMessage}`)
      console.log(newMessagesArray);
      setMessages(newMessagesArray)
    })
  }, [])

  const sendMessage = ()=>{
    socket.current.emit('sendMessage', {
      message: messageInput.current.value,
      toId: socketIdInput.current.value
    })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>{mySocketId}</h1>
          <div className="messages-container">
            {messages.map((message)=>{
              return <div>{message}</div>
            })}
          </div>

          <div className="input-container">
            <input ref={messageInput} type="text" placeholder='type message here' />
            <input ref={socketIdInput} type="text" placeholder='socket id' />
            <button onClick={sendMessage}>Send Message</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

