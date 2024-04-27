import React from 'react';
import { useHttpRequest } from '../hooks';

export function useQuestionQuery(params) {
  const [question, setQuestion] = React.useState();
  const [shouldTrigger, setShouldTrigger] = React.useState(false);

  const { data, error, loading } = useHttpRequest({
    route: '/messages',
    method: 'POST',
    skip: !shouldTrigger || !question || !params.details || !params.details.hole || !params.details.description,
    body: { deviceId: params.deviceId, question, vacancyContext: params.details },
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
