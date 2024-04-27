import React from 'react';
import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import { useDeviceIdQuery } from '../../data/use-device-id-query';
import { useHistoricQuery } from '../../data/use-historic-query';
import { useQuestionQuery } from '../../data/use-question-query';
import { useDeviceId } from '../../hooks';

// Templates for suggestioned questions
// const templates = [
//   {
//     question: 'Lorem ipsum?',
//     onClick: () => alert('In progress...'),
//   },
// ];

export function ChatPage() {
  const [tempQuestion, setTempQuestion] = React.useState('');
  const { deviceId, setDeviceId } = useDeviceId();

  useDeviceIdQuery({
    shouldFetchNewId: !deviceId,
    onSuccess: setDeviceId,
    onError: alert,
  });

  const { historic, refetch: refetchHistoric } = useHistoricQuery({
    deviceId,
    onSuccess: handleSuccess,
    onError: (error) => {
      alert(error);
      setDeviceId(null);
    },
  });

  const { sendQuestion } = useQuestionQuery({
    deviceId,
    onSuccess: refetchHistoric,
    onError: alert,
  });

  function handleSuccess() {
    setTempQuestion('');
  }

  function handleMessage(question) {
    setTempQuestion(question);
    sendQuestion(question);
  }

  const aggregatedHistory = [
    ...historic,
    ...(tempQuestion ? [{ question: tempQuestion, response: '...', date: new Date().toISOString() }] : []),
  ];

  return (
    <>
      <Chat historic={aggregatedHistory} />
      {/* TODO - Validar se iremos colocar */}
      {/* <SuggestionedQuestions templates={templates} /> */}
      <Input onSubmit={handleMessage} />
    </>
  );
}
