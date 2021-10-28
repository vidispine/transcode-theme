import React from 'react';
import { Box, List, Button } from '@material-ui/core';

import FileCard from './FileCard';

const OutputList = ({ itemListType = {}, page, onChangePage, onDelete }) => {
  const { item: items = [], hits } = itemListType;
  const sortedItems = items.map(({ shape: unsorted = [], ...rest }) => {
    const shape = unsorted.sort(({ tag: aTag = [] }, { b: bTag = [] }) => {
      if (aTag.includes('original')) return 1;
      if (bTag.includes('original')) return -1;
      return 0;
    });
    return { ...rest, shape };
  });
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {sortedItems.map((itemType) => (
            <FileCard key={itemType.id} itemType={itemType} onDelete={onDelete} />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={page < 1} onClick={() => onChangePage({ page: page - 1 })}>
          Prev
        </Button>
        <Button disabled={(page + 1) * 10 > hits} onClick={() => onChangePage({ page: page + 1 })}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default OutputList;
