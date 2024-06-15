import { useHttpRequest } from '../hooks';

export function useReportStatsQuery({ body, onSuccess, onError } = {}) {
  const { data, loading, error, refetch } = useHttpRequest({
    baseUrl: process.env.EXPO_PUBLIC_REPORTS_API,
    route: `/stats?month=${body.month}&year=${body.year}`,
    method: 'GET',
    onSuccess,
    onError,
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}
