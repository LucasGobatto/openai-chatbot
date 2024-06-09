import { useHttpRequest } from '../hooks';

export function useReportStatsQuery({ body, onSuccess, onError } = {}) {
  const { data, loading, error, refetch } = useHttpRequest({
    baseUrl: import.meta.env.VITE_REPORT_BASE_URL,
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
