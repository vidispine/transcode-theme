import { item as ItemApi } from '@vidispine/vdt-api';
import { useApi } from '@vidispine/vdt-react';

const useSearchFiles = () => {
  const {
    data: itemListType,
    request: searchItems,
    isLoading,
    hasLoaded,
  } = useApi(ItemApi.searchItem);
  const onSearch = (text = '', first = 1) => {
    const itemSearchDocument = {
      field: [
        {
          name: 'originalFilename',
          value: [
            {
              value: `*${text}*`,
            },
          ],
        },
        {
          name: '__shape_size',
          value: [
            {
              value: '1',
            },
          ],
        },
      ],
    };
    return searchItems({
      itemSearchDocument,
      queryParams: {
        number: 10,
        content: 'shape,metadata',
        first,
      },
    });
  };

  return {
    onSearch,
    itemListType,
    isLoading,
    hasLoaded,
  };
};

export default useSearchFiles;
