import React from 'react';
import { useHttpRequest } from '../hooks';

// TODO - adicionar o resume se der tempo de fazermos a feature
const contextType = 'vacancy'; // 'vacancy' | 'resume'

export function useQuestionQuery(params) {
  const [question, setQuestion] = React.useState();
  const [shouldTrigger, setShouldTrigger] = React.useState(false);

  const { data, error, loading } = useHttpRequest({
    baseUrl: import.meta.env.VITE_MESSAGE_BASE_URL,
    route: `/messages/${params.deviceId}`,
    method: 'POST',
    skip: !shouldTrigger || !question || !params.details || !params.details.role || !params.details.description,
    body: { question, vacancyContext: params.details, contextType },
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess(data) {
    params.onSuccess && params.onSuccess(data);
    setShouldTrigger(false);
  }

  function handleError(error) {
    params.onError && params.onError(error);
    setShouldTrigger(false);
  }

  const sendQuestion = React.useCallback((question) => {
    setShouldTrigger(true);
    setQuestion(question);
  }, []);

  return { data, error, loading, sendQuestion };
}
