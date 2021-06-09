import React from 'react';
import { withStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import { SearchInput, ItemList } from '@vidispine/vdt-materialui';

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
  const { onSearch, itemListType, hasLoaded, isLoading } = useSearchItem();
  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardHeader title="Search For Items" />
        <CardContent>
          <SearchInput
            className={classes.SearchInput}
            onSubmit={onSearch}
            submitting={hasLoaded && isLoading}
          />
          <ItemList
            className={classes.ItemList}
            itemListType={itemListType}
            ItemListItemProps={{ primary: 'title', secondary: 'itemId' }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(Search);
