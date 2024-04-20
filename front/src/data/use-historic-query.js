import React from 'react';
import { useHttpRequest } from '../hooks';

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

const mockedRespose = 'Esta é um resposta padrão enquanto a API não estiver pronta';

export function useHistoricQuery() {
  const [historic, setHistoric] = React.useState(historicMock);

  const { error, loading } = useHttpRequest({
    route: '/historic',
    method: 'GET',
    skip: true, // TODO - change to false when the API is ready
  });

  // TODO - remove this when the API is ready and use the refetch function
  function customRefetch(question) {
    const newHistoric = [...historic, { question, response: mockedRespose, date: new Date().toISOString() }];
    setHistoric(newHistoric);
  }

  // TODO - change to `data` when the API is ready
  return { historic: historic, error, loading, refetch: customRefetch };
}
