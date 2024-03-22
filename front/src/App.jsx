import * as React from 'react';
import { Input } from './components/input';
import { Chat } from './components/chat';

const historicMock = [
  { question: 'Olá', response: 'Olá, como posso te ajudar?' },
  { question: 'Como você está?', response: 'Estou bem, obrigado por perguntar'},
  { question: 'De um exemplo de lorem', response: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.'},
]

export function App() {
  const [historic, setHistoric] = React.useState(historicMock)

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
