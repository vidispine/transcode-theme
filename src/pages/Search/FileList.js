/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import debounce from 'lodash.debounce';
import { useSnackbar } from 'notistack';
import { item as ItemApi } from '@vidispine/vdt-api';
import { useSearchItem } from '@vidispine/vdt-react';
import { Box, Tab, Tabs, Paper, CircularProgress } from '@material-ui/core';

import { useSearch } from '../../hooks';
import { useDialog } from '../../context';
import { Snackbar } from '../../components';
import InputList from './InputList';
import OutputList from './OutputList';
import TranscodeDialog from './TranscodeDialog';

const defaultInputState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 1 }] }] },
  queryParams: {
    content: 'shape,metadata',
    field: ['originalFilename:title', 'itemId', 'title'],
    methodMetadata: [
      { key: 'format', value: 'SIGNED-AUTO' },
      { key: 'contentDisposition', value: 'attachment' },
    ],
  },
  rowsPerPage: 10,
};

const defaultOutputState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 2 }] }] },
  queryParams: {
    content: 'shape,metadata',
    field: ['originalFilename:title', 'itemId', 'title'],
    methodMetadata: [
      { key: 'format', value: 'SIGNED-AUTO' },
      { key: 'contentDisposition', value: 'attachment' },
    ],
  },
  rowsPerPage: 10,
};

const FileList = ({ query, setQuery }) => {
  const { state: inputState, ...inputActions } = useSearch(defaultInputState);
  const { state: outputState, ...outputActions } = useSearch(defaultOutputState);
  const {
    itemListType: inputItems = {},
    isLoading: isLoadingInput,
    isError: isErrorInput,
    onRefresh: onRefreshInput,
  } = useSearchItem(inputState);
  const {
    itemListType: outputItems = {},
    isLoading: isLoadingOutput,
    isError: isErrorOutput,
    onRefresh: onRefreshOutput,
  } = useSearchItem(outputState);
  const [{ page: inputPage }, { page: outputPage }] = [inputState, outputState];
  const isLoading = isLoadingInput || isLoadingOutput;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => isErrorInput && setTimeout(onRefreshInput, 5000), [isErrorInput]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => isErrorOutput && setTimeout(onRefreshOutput, 5000), [isErrorOutput]);

  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [tab, setTab] = React.useState('input');
  const onChange = (_, newTab) => {
    if (query) setQuery('');
    if (inputPage > 0) inputActions.onChangePage({ page: 0 });
    if (outputPage > 0) outputActions.onChangePage({ page: 0 });
    setTab(newTab);
  };

  const debouncedInputQuery = React.useRef(debounce(inputActions.setSearchText, 500)).current;
  const debouncedOutputQuery = React.useRef(debounce(outputActions.setSearchText, 500)).current;
  React.useEffect(() => {
    if (tab === 'input') debouncedInputQuery(`*${query.toLowerCase()}*`);
    if (tab === 'output') debouncedOutputQuery(`*${query.toLowerCase()}*`);
    // eslint-disable-next-line
  }, [query])

  const onDelete = (itemId) =>
    showDialog({
      title: 'Delete item',
      message: 'Are you sure you want to delete this item?',
      okText: 'Yes, delete item',
      noText: 'No, cancel',
    })
      .then(() =>
        ItemApi.removeItem({ itemId })
          .then(() => enqueueSnackbar('Item deleted'))
          .catch(() => enqueueSnackbar('Failed to delete item', { variant: 'error' })),
      )
      .catch(() => null);

  const onTranscode = (item) =>
    showDialog({ Dialog: TranscodeDialog, item })
      .then((response) =>
        enqueueSnackbar('', { persist: true, content: <Snackbar response={response} /> }),
      )
      .catch(() => null);

  return (
    <Box display="grid" gridTemplateRows="auto 1fr" gridGap={16}>
      <Paper>
        <Tabs value={tab} onChange={onChange}>
          <Tab disableRipple value="input" label={`Input (${inputItems.hits || 0})`} />
          <Tab disableRipple value="output" label={`Output (${outputItems.hits || 0})`} />
          {isLoading && (
            <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
          )}
        </Tabs>
      </Paper>
      <Box overflow="hidden" hidden={tab !== 'input'}>
        <InputList
          page={inputPage}
          onTranscode={onTranscode}
          itemListType={inputItems}
          {...inputActions}
        />
      </Box>
      <Box overflow="hidden" hidden={tab !== 'output'}>
        <OutputList
          itemListType={outputItems}
          page={outputPage}
          onDelete={onDelete}
          {...outputActions}
        />
      </Box>
    </Box>
  );
};

export default FileList;
