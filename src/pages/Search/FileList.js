import React from 'react';
import { useSnackbar } from 'notistack';
import { List } from '@material-ui/core';

import FileCard from './FileCard';
import { useDialog } from '../../components';
import TranscodeDialog from './TranscodeDialog';

const FileList = ({ itemListType = {}, output = false }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showDialog } = useDialog();
  const { item: items = [] } = itemListType;

  const sortedItems = items.map((item) => {
    if (!output) return item;
    const { shape: unsorted = [], ...rest } = item;
    const shape = unsorted.sort(({ tag: aTag }, { b: bTag }) => {
      if (aTag.includes('original')) return 1;
      if (bTag.includes('original')) return -1;
      return 0;
    });
    return { ...rest, shape };
  });

  const onTranscode = (item) =>
    showDialog({ Dialog: TranscodeDialog, item })
      .then(() => enqueueSnackbar('Transcoding started', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));

  return (
    <List disablePadding>
      {sortedItems.map((itemType) => (
        <FileCard key={itemType.id} itemType={itemType} allowTranscode onTranscode={onTranscode} />
      ))}
    </List>
  );
};

export default FileList;
