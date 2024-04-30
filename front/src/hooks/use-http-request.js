import React, { useCallback } from 'react';

export function useHttpRequest(params) {
  const { route, method, body, skip, onSuccess, onError } = params;
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  if (!route || !method) {
    throw new Error('You must provide a route and a method');
  }

  const handleSuccess = React.useCallback(
    (response) => {
      const data = mapResponse(response);

      setData(data);
      onSuccess && onSuccess(data);
    },
    [setData, onSuccess],
  );

  const handleError = React.useCallback(
    (data) => {
      const error = mapError(data);

      setError(error);
      onError && onError(error);
    },
    [setError, onError],
  );

  const triggerRequest = useCallback(() => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_API_URL;
    const url = `${baseUrl}${route}`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          handleError(data);
        } else {
          handleSuccess(data);
        }
      })
      .catch((error) => {
        console.error(error);
        onError(error.message);
      })
      .finally(() => setLoading(false));
  }, [route, method, body, onError, handleError, handleSuccess]);

  React.useEffect(() => {
    if (!skip && !loading) {
      triggerRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  function refetch() {
    triggerRequest();
  }

  return { data, error, loading, refetch };
}

function mapResponse(data) {
  return data.data;
}

function mapError(data) {
  return data.error;
}
