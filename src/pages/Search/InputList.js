import React from 'react';
import { Box, List, Button } from '@material-ui/core';

import FileCard from './FileCard';

const InputList = ({ itemListType = {}, page, onChangePage, onTranscode, onDelete }) => {
  const { item: items = [], hits } = itemListType;
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {items.map((itemType) => (
            <FileCard
              key={itemType.id}
              itemType={itemType}
              allowTranscode
              onTranscode={onTranscode}
              onDelete={onDelete}
            />
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

export default InputList;
