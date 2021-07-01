import React from 'react';
import { List } from '@material-ui/core';
import { SearchItem, useSearch } from '@vidispine/vdt-react';

import FileCard from './FileCard';

const initialState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 2 }] }] },
  queryParams: {
    number: 10,
    content: 'shape,metadata',
    field: ['originalFilename:title'],
    first: 1,
  },
};
const ItemList = ({ itemListType = {} }) => {
  const { item = [] } = itemListType;
  const sortedItems = item.map(({ shape: unsorted = [], ...rest }) => {
    const shape = unsorted.sort(({ tag: aTag }, { b: bTag }) => {
      if (aTag.includes('original')) return 1;
      if (bTag.includes('original')) return -1;
      return 0;
    });
    return { ...rest, shape };
  });
  return (
    <List>
      {sortedItems.map((itemType) => (
        <FileCard key={itemType.id} itemType={itemType} />
      ))}
    </List>
  );
};

export default () => {
  const { state = {} } = useSearch(initialState);
  const { itemSearchDocument, queryParams } = state;
  return (
    <SearchItem itemSearchDocument={itemSearchDocument} queryParams={queryParams}>
      <ItemList />
    </SearchItem>
  );
};
