import React, { useEffect } from 'react';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Button,
  List,
  ListItem,
  Tab,
  Tabs,
} from '@material-ui/core';
import parseFileSize from 'filesize';
import ShapeInfo from './ShapeInfo';

import useSearchItem from './hooks/useSearchItem';
import useFileShapes from './hooks/useFileShapes';
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
  const [sourceFirst, setSourceFirst] = React.useState(0);
  const [outputFirst, setOutputFirst] = React.useState(0);
  const [sourceSearchString, setSourceSearchString] = React.useState('');
  const [outputSearchString, setOutputSearchString] = React.useState('');
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);
  const { onSearch, fileListType, hasLoaded, isLoading } = useSearchItem();
  const { onListShapes, hasShapesLoaded, fileShapes } = useFileShapes();
  const { file: fileList = [] } = hasLoaded ? fileListType : {};
  useEffect(() => {
    if (hasLoaded) {
      onListShapes(fileList.map((file) => file.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);
  const outputList = [];
  useEffect(() => {
    onSearch(sourceSearchString, sourceFirst);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceFirst]);
  useEffect(() => {
    onSearch(outputSearchString, outputFirst);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputFirst]);

  const renderShapeInfo = (file) => {
    if (!hasShapesLoaded || !fileShapes[file.id] || Object.keys(fileShapes[file.id]).length === 0) {
      return <p>Technical metadata extraction not completed.</p>;
    }
    return <ShapeInfo file={file} shape={fileShapes[file.id]} />;
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
            <Card variant="outlined">
              <CardHeader title="Search files" />
              <CardContent>
                <SearchInput
                  className={classes.SearchInput}
                  onSubmit={onSearch}
                  submitting={hasLoaded && isLoading}
                  onChange={setSourceSearchString}
                />
                <Button
                  onClick={() => {
                    setSourceFirst(Math.max(0, sourceFirst - 10));
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    setSourceFirst(sourceFirst + 10);
                  }}
                >
                  Next
                </Button>
                <List>
                  {fileList.map((file) => (
                    <ListItem key={file.id}>
                      <MediaCardFullWidth
                        className="search-result"
                        key={file.id}
                        title={file.path}
                        subheader={parseFileSize(file.size)}
                        ExpandComponent={false}
                        content={renderShapeInfo(file)}
                        ContentProps={{ component: 'div' }}
                      />
                    </ListItem>
                  ))}
                </List>
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
                  onChange={setOutputSearchString}
                />
                <Button
                  onClick={() => {
                    setOutputFirst(Math.max(0, outputFirst - 10));
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    setOutputFirst(outputFirst + 10);
                  }}
                >
                  Next
                </Button>
                {outputList.map((file) => (
                  <MediaCardFullWidth
                    className="search-result"
                    key={file.id}
                    title={file.path}
                    subheader={parseFileSize(file.size)}
                    expandComponent={null}
                    content={renderShapeInfo(file)}
                    ContentProps={{ component: 'div' }}
                  />
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
