import Pusher from 'pusher-js'
import { useEffect, useRef, useState } from 'react'

const pusher = new Pusher(process.env.PUSHER_APP_KEY, { cluster: process.env.PUSHER_APP_CLUSTER })
const channel = pusher.subscribe('my-channel')

const IndexPage = () => {
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    channel.bind('server-event', (data) => {
      setMessages(previousMessages => [...previousMessages, data.message])
    })
  }, [])

  const handleSubmit = () => {
    fetch('/api', { method: 'post', body: JSON.stringify({ message: inputRef.current.value }) })
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Send</button>
      <h3>Messages:</h3>
      {messages.map((m) => (
        <div key={m}>{m}</div>
      ))}
    </div>
  )
}

export default IndexPage
