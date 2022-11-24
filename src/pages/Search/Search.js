/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Box } from '@material-ui/core';

import { Split, Search } from '../../components';
import { useSplitters } from '../../context';
import JobList from '../Job/JobList';

import FileList from './FileList';

function Wrapper() {
  const [query, setQuery] = React.useState('');
  const { splitters, setSplitter } = useSplitters();

  return (
    <Box height={1} display="flex" flexDirection="column">
      <Search onChange={setQuery} value={query} />
      <Box mt={2} flexGrow={1} overflow="hidden">
        <Split
          style={{ flexDirection: 'row' }}
          direction="horizontal"
          minSize={375}
          sizes={splitters.vertical}
          gutterSize={20}
          onDragEnd={(sizes) => setSplitter('horizontal', sizes)}
        >
          <FileList query={query} setQuery={setQuery} />
          <JobList />
        </Split>
      </Box>
    </Box>
  );
}

export default Wrapper;
