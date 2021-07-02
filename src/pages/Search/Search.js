/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SearchItem, useSearch } from '@vidispine/vdt-react';
import { Box, Tab, Tabs } from '@material-ui/core';

import JobList from './JobList';
import FileList from './FileList';
import { useSplitters } from '../../context';
import { Split, Search } from '../../components';

const initialState = {
  itemSearchDocument: { field: [{ name: '__shape_size', value: [{ value: 1 }] }] },
  queryParams: {
    number: 10,
    content: 'shape,metadata',
    field: ['originalFilename:title'],
    first: 1,
  },
};

const ItemSearch = ({ itemSearchDocument, setItemSearchDocument, queryParams }) => {
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
  const { state = {}, setSearchText, setItemSearchDocument } = useSearch(initialState);
  const onSearch = (val) => setSearchText(`*${val}*`);
  return (
    <>
      <Search onSubmit={onSearch} />
      <Split
        style={{ flexDirection: 'row' }}
        direction="horizontal"
        minSize={375}
        sizes={splitters.vertical}
        gutterSize={20}
        onDragEnd={(sizes) => setSplitter('horizontal', sizes)}
      >
        <ItemSearch {...state} setItemSearchDocument={setItemSearchDocument} />
        <JobList />
      </Split>
    </>
  );
}

export default Wrapper;
