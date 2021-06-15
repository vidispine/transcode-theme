import React, { useEffect } from 'react';
import { withStyles, Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useSearchItem from './hooks/useSearchItem';

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
  const [first, setFirst] = React.useState(1);
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);
  const { onSearch, fileListType, hasLoaded, isLoading } = useSearchItem();
  const { file: fileList = [] } = hasLoaded ? fileListType : {};
  const outputList = [];
  useEffect(() => {
    onSearch(first);
  }, [first]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.root}>
      <Tabs value={tab} onChange={onChangeTab}>
        <Tab value="source" label="Source" />
        <Tab value="output" label="Output" />
      </Tabs>
      {
        {
          source: (
            <Card variant="outlined">
              <CardHeader title="Search files" />
              <CardContent>
                <SearchInput
                  className={classes.SearchInput}
                  onSubmit={onSearch}
                  submitting={hasLoaded && isLoading}
                />
                <Button
                  onClick={() => {
                    setFirst(Math.max(1, first - 10));
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    setFirst(first + 10);
                  }}
                >
                  Next
                </Button>
                {fileList.map((file) => (
                  <MediaCardFullWidth title={file.path} subheader={file.timestamp} />
                ))}
              </CardContent>
            </Card>
          ),
          output: (
            <Card variant="outlined">
              <CardHeader title="" />
              <CardContent>
                <SearchInput
                  className={classes.SearchInput}
                  onSubmit={onSearch}
                  submitting={hasLoaded && isLoading}
                />
                {outputList.map((file) => (
                  <MediaCardFullWidth title={file.path} subheader="Aug 5th, 2021" />
                ))}
              </CardContent>
            </Card>
          ),
        }[tab]
      }
    </div>
  );
}

export default withStyles(styles)(Search);
