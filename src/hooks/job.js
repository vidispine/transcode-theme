import { useQuery } from 'react-query';
import { job as JobApi } from '@vidispine/vdt-api';

// eslint-disable-next-line import/prefer-default-export
export function useGetJobs(type, { state, first, number = 10 }) {
  return useQuery(
    ['getJobs', type, first],
    () =>
      JobApi.listJob({
        queryParams: {
          step: true,
          type: 'RAW_IMPORT,PLACEHOLDER_IMPORT,TRANSCODE',
          sort: 'startTime desc',
          number,
          state,
          first,
        },
      }),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 15000,
      keepPreviousData: true,
    },
  );
}
