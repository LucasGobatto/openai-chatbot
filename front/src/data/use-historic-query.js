import React from 'react';
import { useHttpRequest } from '../hooks';

export function useHistoricQuery({ deviceId, onSuccess, onError }) {
  // We are not using the data from the request, because this request
  // must be triggered only once, and the data is stored in the state
  const [historic, setHistoric] = React.useState([]);

  const { error, loading, refetch } = useHttpRequest({
    baseUrl: import.meta.env.VITE_MESSAGE_BASE_URL,
    route: `/messages/${deviceId}`,
    method: 'GET',
    skip: !deviceId || historic.length > 0,
    onSuccess: handleSuccess,
    onError,
  });

  function handleSuccess(data) {
    setHistoric(data.map((res) => ({ date: res.sent_at, question: res.question, response: res.response })));
    onSuccess && onSuccess(data);
  }

  return { historic, error, loading, refetch };
}
