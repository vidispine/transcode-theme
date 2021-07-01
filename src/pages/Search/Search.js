import React from 'react';
import { withStyles, Tab, Tabs } from '@material-ui/core';
// import FileSearch from './components/FileSearch';
import TranscodeModal from './components/TranscodeModal';

import './styles/search.css';
import JobList from './JobList';
import SourceList from './SourceList';
import OutputList from './OutputList';
import { useSplitters } from '../../context';
import { Split } from '../../components';

const styles = (theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  ItemList: {},
  SearchInput: {},
});

function Search({ classes }) {
  const { splitters, setSplitter } = useSplitters();
  const [tab, setTab] = React.useState('source');
  const [selectedFile] = React.useState();
  const [transcodeModalOpen, setTranscodeModalOpen] = React.useState(false);
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);

  // const openTranscodeModal = (item) => {
  //   setSelectedFile(item);
  //   setTranscodeModalOpen(true);
  // };

  const closeTranscodeModal = () => {
    setTranscodeModalOpen(false);
  };

  return (
    <>
      <Split
        style={{ flexDirection: 'row' }}
        direction="horizontal"
        minSize={375}
        sizes={splitters.vertical}
        gutterSize={20}
        onDragEnd={(sizes) => setSplitter('horizontal', sizes)}
      >
        <div className={classes.tabs}>
          <Tabs value={tab} onChange={onChangeTab}>
            <Tab value="source" label="Source" />
            <Tab value="output" label="Output" />
          </Tabs>
          {tab === 'source' && <SourceList hidden={tab !== 'source'} />}
          {tab === 'output' && <OutputList hidden={tab !== 'source'} />}
        </div>
        <div>
          <JobList />
        </div>
      </Split>
      <TranscodeModal
        item={selectedFile}
        open={transcodeModalOpen}
        handleClose={closeTranscodeModal}
      />
    </>
  );
}

export default withStyles(styles)(Search);
