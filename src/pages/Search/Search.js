/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SearchItem } from '@vidispine/vdt-react';
import { Box, Tab, Tabs } from '@material-ui/core';

import JobList from './JobList';
import FileList from './FileList';
import { useSplitters } from '../../context';
import { Split, Search } from '../../components';
import { useSearch } from '../../hooks';

const initialState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 1 }] }] },
  queryParams: {
    content: 'shape,metadata',
    field: ['originalFilename:title', 'itemId', 'title'],
  },
  rowsPerPage: 5,
};

export const ItemSearch = ({ itemSearchDocument, setItemSearchDocument, queryParams }) => {
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
  return (
    <Box>
      <Tabs value={tab} onChange={onChange}>
        <Tab disableRipple value="source" label="Source" />
        <Tab disableRipple value="output" label="Output" />
      </Tabs>
      <SearchItem itemSearchDocument={itemSearchDocument} queryParams={queryParams}>
        <FileList output={tab === 'output'} />
      </SearchItem>
    </Box>
  );
};

function Wrapper() {
  const { splitters, setSplitter } = useSplitters();
  const { state, onChangePage, setSearchText, setItemSearchDocument } = useSearch(initialState);
  const { page, queryParams, itemSearchDocument } = state;
  const onSearch = (val) => setSearchText(`*${val}*`);
  return (
    <Box px={2} pt={2} height={1} display="flex" flexDirection="column">
      <Search onSubmit={onSearch} />
      <Box mt={2} flexGrow={1} overflow="hidden">
        <Split
          style={{ flexDirection: 'row' }}
          direction="horizontal"
          minSize={375}
          sizes={splitters.vertical}
          gutterSize={20}
          onDragEnd={(sizes) => setSplitter('horizontal', sizes)}
        >
          <SearchItem queryParams={queryParams} itemSearchDocument={itemSearchDocument}>
            <FileList
              page={page}
              onChangePage={onChangePage}
              setItemSearchDocument={setItemSearchDocument}
            />
          </SearchItem>
          <JobList />
        </Split>
      </Box>
    </Box>
  );
}

export default Wrapper;
