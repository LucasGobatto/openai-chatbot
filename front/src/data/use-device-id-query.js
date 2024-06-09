import { useHttpRequest } from '../hooks';

export function useDeviceIdQuery({ shouldFetchNewId = false, onSuccess, onError }) {
  const { data, loading, error } = useHttpRequest({
    baseUrl: import.meta.env.VITE_MESSAGE_BASE_URL,
    route: '/device-id',
    method: 'POST',
    skip: !shouldFetchNewId,
    onSuccess,
    onError,
  });

  return {
    deviceId: data,
    loading,
    error,
  };
}
