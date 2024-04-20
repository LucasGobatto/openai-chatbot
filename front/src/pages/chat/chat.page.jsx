import React from 'react';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';

const historicMock = [
  { question: 'Olá', response: 'Olá, como posso te ajudar?', date: '2024-04-18T12:00:00.000Z' },
  { question: 'Como você está?', response: 'Estou bem, obrigado por perguntar', date: '2024-04-18T12:00:00.000Z' },
  {
    question: 'De um exemplo de lorem',
    response:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.',
    date: '2024-04-19T12:00:00.000Z',
  },
];

// Templates for suggestioned questions
// const templates = [
//   {
//     question: 'Lorem ipsum?',
//     onClick: () => alert('In progress...'),
//   },
//   {
//     question: 'Lorem ipsum?',
//     onClick: () => alert('In progress...'),
//   },
// ];

export function ChatPage() {
  const [historic, setHistoric] = React.useState(historicMock);

  function handleMessage(question) {
    // TODO - send message to server
    const mockerdData = 'response';
    setHistoric([...historic, { question, response: mockerdData, date: new Date().toISOString() }]);
  }

  return (
    <>
      <Chat historic={historic} />
      {/* TODO - Validar se iremos colocar */}
      {/* <SuggestionedQuestions templates={templates} /> */}
      <Input onSubmit={handleMessage} />
    </>
  );
}
