import { item as ItemApi } from '@vidispine/vdt-api';
import { useApi } from '@vidispine/vdt-react';

const useSearchItem = () => {
  const { data: itemListType, request: searchItem, isLoading, hasLoaded } = useApi(
    ItemApi.searchItem,
  );
  const onSearch = (value) =>
    searchItem({
      itemSearchDocument: { text: [{ value }] },
      queryParams: {
        number: 10,
        content: 'metadata',
        field: ['title', 'itemId'],
      },
    });
  return {
    onSearch,
    itemListType,
    isLoading,
    hasLoaded,
  };
};

export default useSearchItem;
