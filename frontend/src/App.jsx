import io from 'socket.io-client';
import { useEffect, useState } from 'react'; 

const socket = io('/');

function App() {
  const [message, setMessage] = useState("");  
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)//tiene que ser el mismo nombre que esta en el backend
  }
  useEffect(() => {
    socket.on('sendMessage', reciveMessage);
    return() => {
      socket.off("sendMessage", reciveMessage)
    }
    }, [])

    const reciveMessage = message => 
      setMessages((state)=>[...state, message]);

  return (
    <div className='h-screen bg-zinc-800 text-black flex flex-col items-center justify-center'>
      <form className="max-w-2xl bg-zinc-900 p-10" onSubmit={handleSubmit}>
        <input className='p-3' type="text" placeholder='Write here' onChange={(e)=>setMessage(e.target.value)}/>
        <div className='mx-1 mt-3'>
        <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Send
        </button>
        </div>
      </form>
      <ul>
        {
          messages.map((message, index) => (
            <li key={index} className='text-white'>
            {message.from}: {message.body}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App