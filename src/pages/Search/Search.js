import React from 'react';
import { withStyles, Card, CardHeader, CardContent, Tab, Tabs } from '@material-ui/core';
import FileSearch from './FileSearch';

import './styles/search.css';

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
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);
  const sourceStorage = 'VX-31';
  const outputStorage = 'VX-29';

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
              <CardHeader title="" />
              <CardContent>
                <FileSearch classes={classes} storageId={sourceStorage} />
              </CardContent>
            </Card>
          ),
          output: (
            <Card variant="outlined" key="output">
              <CardHeader title="" />
              <CardContent>
                <FileSearch classes={classes} storageId={outputStorage} />
              </CardContent>
            </Card>
          ),
        }[tab]
      }
    </div>
  );
}

export default withStyles(styles)(Search);
