import { file as FileApi } from '@vidispine/vdt-api';
import { useApi } from '@vidispine/vdt-react';

const useSearchItem = () => {
  const {
    data: fileListType,
    request: listFileStorage,
    isLoading,
    hasLoaded,
  } = useApi(FileApi.listFileStorage);
  const onSearch = (first = 1) =>
    listFileStorage({
      storageId: 'VX-31',
      queryParams: {
        number: 10,
        sort: 'fileId desc',
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

export default useSearchItem;
