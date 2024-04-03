import React from 'react';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import { SuggestionedQuestions } from '../../components/suggested-questions';

const historicMock = [
  { question: 'Olá', response: 'Olá, como posso te ajudar?' },
  { question: 'Como você está?', response: 'Estou bem, obrigado por perguntar' },
  {
    question: 'De um exemplo de lorem',
    response:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.',
  },
];

const templates = [
  {
    question: 'Lorem ipsum?',
    onClick: () => alert('In progress...'),
  },
  {
    question: 'Lorem ipsum?',
    onClick: () => alert('In progress...'),
  },
];

export function ChatPage() {
  const [historic, setHistoric] = React.useState(historicMock);

  function handleMessage(question) {
    // TODO - send message to server
    const mockerdData = 'response';
    setHistoric([...historic, { question, response: mockerdData }]);
  }

  return (
    <>
      <Chat historic={historic} />
      <SuggestionedQuestions templates={templates} />
      <Input onSubmit={handleMessage} />
    </>
  );
}
