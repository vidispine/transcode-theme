import { file as FileApi } from '@vidispine/vdt-api';
import { useApi } from '@vidispine/vdt-react';

const useSearchFiles = (storageId) => {
  const {
    data: fileListType,
    request: listFileStorage,
    isLoading,
    hasLoaded,
  } = useApi(FileApi.listFileStorage);
  const onSearch = (text = '', first = 0) =>
    listFileStorage({
      storageId,
      queryParams: {
        number: 10,
        sort: 'fileId desc',
        path: `*${text}*`,
        prefix: true,
        wildcard: true,
        first,
      },
    });

  return {
    onSearch,
    fileListType,
    isLoading,
    hasLoaded,
  };
};

export default useSearchFiles;
