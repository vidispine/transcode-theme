/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import debounce from 'lodash.debounce';
import { useSnackbar } from 'notistack';
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
    'noauth-url': true,
    methodType: 'AUTO',
  },
  rowsPerPage: 10,
};

const defaultOutputState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 2 }] }] },
  queryParams: {
    content: 'shape,metadata',
    field: ['originalFilename:title', 'itemId', 'title'],
    'noauth-url': true,
    methodType: 'AUTO',
  },
  rowsPerPage: 10,
};

const FileList = ({ query, setQuery }) => {
  const { state: inputState, ...inputActions } = useSearch(defaultInputState);
  const { state: outputState, ...outputActions } = useSearch(defaultOutputState);
  const { itemListType: outputItems = {}, isLoading: isLoadingOutput } = useSearchItem(outputState);
  const { itemListType: inputItems = {}, isLoading: isLoadingInput } = useSearchItem(inputState);
  const [{ page: inputPage }, { page: outputPage }] = [inputState, outputState];
  const isLoading = isLoadingInput || isLoadingOutput;

  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [tab, setTab] = React.useState('input');
  const onChange = (_, newTab) => {
    if (query) setQuery('');
    setTab(newTab);
  };

  const debouncedInputQuery = React.useRef(debounce(inputActions.setSearchText, 500)).current;
  const debouncedOutputQuery = React.useRef(debounce(inputActions.setSearchText, 500)).current;
  React.useEffect(() => {
    if (tab === 'input') debouncedInputQuery(`*${query.toLowerCase()}*`);
    if (tab === 'output') debouncedOutputQuery(`*${query.toLowerCase()}*`);
    // eslint-disable-next-line
  }, [query])


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
      <Box overflow="hidden" className="input" hidden={tab !== 'input'}>
        <InputList
          page={inputPage}
          onTranscode={onTranscode}
          itemListType={inputItems}
          {...inputActions}
        />
      </Box>
      <Box overflow="hidden" className="output" hidden={tab !== 'output'}>
        <OutputList itemListType={outputItems} page={outputPage} {...outputActions} />
      </Box>
    </Box>
  );
};

export default FileList;
