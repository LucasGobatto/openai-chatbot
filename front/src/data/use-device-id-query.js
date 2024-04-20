import { useHttpRequest } from '../hooks';

export function useDeviceIdQuery({ shouldFetchNewId = false, onSuccess }) {
  const { data, loading, error } = useHttpRequest({
    route: '/device-id',
    method: 'GET',
    skip: !shouldFetchNewId,
    onSuccess,
  });

  return {
    deviceId: data,
    loading,
    error,
  };
}
