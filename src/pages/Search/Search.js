import React from 'react';
import { withStyles, Card, CardContent, Tab, Tabs } from '@material-ui/core';
import FileSearch from './components/FileSearch';
import TranscodeModal from './components/TranscodeModal';
import { useConfiguration } from '../Root/ConfigurationContext';

import './styles/search.css';
import JobList from './JobList';

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
  const [tab, setTab] = React.useState('source');
  const [selectedFile, setSelectedFile] = React.useState();
  const [transcodeModalOpen, setTranscodeModalOpen] = React.useState(false);
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);
  const { sourceStorage, outputStorage, isLoading } = useConfiguration();

  const openTranscodeModal = (item) => {
    setSelectedFile(item);
    setTranscodeModalOpen(true);
  };

  const closeTranscodeModal = () => {
    setTranscodeModalOpen(false);
  };

  return (
    <div className={classes.root}>
      <Tabs value={tab} onChange={onChangeTab}>
        <Tab value="source" label="Source" />
        <Tab value="output" label="Output" />
      </Tabs>
      {
        {
          source: (
            <Card variant="outlined" key="source">
              {!isLoading && (
                <CardContent>
                  <FileSearch
                    classes={classes}
                    storageId={sourceStorage}
                    openTranscodeModal={openTranscodeModal}
                    transcodeAvailable
                  />
                </CardContent>
              )}
            </Card>
          ),
          output: (
            <Card variant="outlined" key="output">
              {!isLoading && (
                <CardContent>
                  <FileSearch
                    classes={classes}
                    storageId={outputStorage}
                    transcodeAvailable={false}
                  />
                </CardContent>
              )}
            </Card>
          ),
        }[tab]
      }
      <TranscodeModal
        item={selectedFile}
        open={transcodeModalOpen}
        handleClose={closeTranscodeModal}
      />
      <JobList />
    </div>
  );
}

export default withStyles(styles)(Search);
