import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, Tab, Tabs, List, Button, CircularProgress } from '@material-ui/core';

import FileCard from './FileCard';
import { useDialog } from '../../components';
import TranscodeDialog from './TranscodeDialog';

const FileList = ({
  page,
  isLoading,
  onChangePage,
  itemListType = {},
  itemSearchDocument,
  setItemSearchDocument,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { showDialog } = useDialog();
  const { item: items = [], hits } = itemListType;

  const [tab, setTab] = React.useState('source');
  const onChange = (_, newTab) => setTab(newTab);
  React.useEffect(() => {
    const doc = itemSearchDocument.field.filter(({ name }) => name !== '__shape_size');
    setItemSearchDocument({
      ...itemSearchDocument,
      field: [...doc, { name: '__shape_size', value: [{ value: tab === 'output' ? 2 : 1 }] }],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const sortedItems = React.useMemo(
    () =>
      items.map((item) => {
        if (tab === 'output') return item;
        const { shape: unsorted = [], ...rest } = item;
        const shape = unsorted.sort(({ tag: aTag = [] }, { b: bTag = [] }) => {
          if (aTag.includes('original')) return 1;
          if (bTag.includes('original')) return -1;
          return 0;
        });
        return { ...rest, shape };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  const onTranscode = (item) =>
    showDialog({ Dialog: TranscodeDialog, item })
      .then(() => enqueueSnackbar('Transcoding started', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));

  return (
    <Box display="grid" gridTemplateRows="auto 1fr auto" gridGap={16}>
      <Tabs value={tab} onChange={onChange}>
        <Tab disableRipple value="source" label="Source" />
        <Tab disableRipple value="output" label="Output" />
        {isLoading && (
          <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
        )}
      </Tabs>
      <Box overflow="auto">
        <List disablePadding>
          {sortedItems.map((itemType) => (
            <FileCard
              key={itemType.id}
              itemType={itemType}
              allowTranscode={tab !== 'output'}
              onTranscode={onTranscode}
            />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={page < 1} onClick={() => onChangePage({ page: page - 1 })}>
          Prev
        </Button>
        <Button disabled={(page + 1) * 5 > hits} onClick={() => onChangePage({ page: page + 1 })}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default FileList;
