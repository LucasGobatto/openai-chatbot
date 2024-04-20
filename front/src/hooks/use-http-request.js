import React from 'react';

export function useHttpRequest(params) {
  const { route, method, body, skip } = params;
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const triggerRequest = React.useCallback(() => {
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
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [route, method, body]);

  React.useEffect(() => {
    if (!skip) {
      triggerRequest();
    }
  }, [skip, triggerRequest]);

  function refetch() {
    triggerRequest();
  }

  return { data, error, loading, refetch };
}
