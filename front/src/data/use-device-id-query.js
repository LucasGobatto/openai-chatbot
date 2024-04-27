import { useHttpRequest } from '../hooks';

export function useDeviceIdQuery({ shouldFetchNewId = false, onSuccess, onError }) {
  const { data, loading, error } = useHttpRequest({
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
