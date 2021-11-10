import { useQuery, useMutation, useQueryClient } from 'react-query';
import { storage as StorageApi } from '@vidispine/vdt-api';
import { parseStorages } from '../utils/utils';

export function useGetStorages() {
  return useQuery(
    ['getStorages'],
    () => {
      return StorageApi.listStorage({}).then(({ data = {} }) => {
        return parseStorages(data);
      });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
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

export function useEditStorage() {
  const queryClient = useQueryClient();
  return useMutation(StorageApi.modifyStorageMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getStorages']);
    },
  });
}
