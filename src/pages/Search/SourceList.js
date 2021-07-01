import React from 'react';
import { List } from '@material-ui/core';
import { SearchItem, useSearch } from '@vidispine/vdt-react';

import FileCard from './FileCard';

const initialState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 1 }] }] },
  queryParams: {
    number: 10,
    content: 'shape,metadata',
    field: ['originalFilename:title'],
    first: 1,
  },
};

const ItemList = ({ itemListType = {} }) => {
  const { item = [] } = itemListType;
  return (
    <List>
      {item.map((itemType) => (
        <FileCard key={itemType.id} itemType={itemType} allowTranscode />
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
