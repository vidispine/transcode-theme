import { useQuery, useMutation, useQueryClient } from 'react-query';
import { storage as StorageApi } from '@vidispine/vdt-api';
import { parseStorages } from '../utils/utils';

export function useGetStorages(opts) {
  return useQuery(
    ['getStorages'],
    () => {
      return StorageApi.listStorage({}).then(({ data = {} }) => {
        return parseStorages(data);
      });
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      ...opts,
    },
  );
}

export function useCreateStorage() {
  const queryClient = useQueryClient();
  return useMutation(StorageApi.createStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getStorages']);
    },
  });
}

export function useModifyStorage() {
  const queryClient = useQueryClient();
  return useMutation(StorageApi.modifyStorage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getStorages']);
    },
  });
}
