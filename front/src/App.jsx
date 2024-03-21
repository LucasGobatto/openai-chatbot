import * as React from 'react';
import { Input } from './components/input';
import { Chat } from './components/chat';

export function App() {
  const [historic, setHistoric] = React.useState([])

  function handleMessage(question) {
    // TODO send message to server
    const mockerdData = "response"
    setHistoric([...historic, { question, response: mockerdData }])
  }

  return (
    <>
      <Chat historic={historic} />
      <Input onSubmit={handleMessage}/>
    </>
   )
}
