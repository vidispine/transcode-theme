import React, { useEffect } from 'react';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import parseFileSize from 'filesize';
import prettyMilliseconds from 'pretty-ms';

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
  const [first, setFirst] = React.useState(1);
  const onChangeTab = (e, newTab) => newTab && setTab(newTab);
  const { onSearch, fileListType, hasLoaded, isLoading } = useSearchItem();
  const { onListShapes, hasShapesLoaded, fileShapes } = useFileShapes();
  const { file: fileList = [] } = hasLoaded ? fileListType : {};
  const [sourceSearchString, setSourceSearchString] = React.useState('');
  useEffect(() => {
    if (hasLoaded) {
      onListShapes(fileList.map((file) => file.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);
  const outputList = [];
  useEffect(() => {
    console.log('Source search string', sourceSearchString);
    onSearch(sourceSearchString, first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first]);

  const renderShapeInfo = (file) => {
    if (!hasShapesLoaded || !fileShapes[file.id] || Object.keys(fileShapes[file.id]).length === 0) {
      return <p>Technical metadata extraction not completed.</p>;
    }
    const container = fileShapes[file.id].containerComponent;
    const video = fileShapes[file.id].videoComponent;
    const audio = fileShapes[file.id].audioComponent;
    const duration = (
      (container && container.mediaInfo.property.find((property) => property.key === 'Duration')) ||
      {}
    ).value;
    const audioTracks = audio ? audio.length : 0;
    const audioChannels = audio ? audio.reduce((acc, a) => acc + Number(a.channelCount), 0) : 0;
    return (
      <>
        <ul>
          {container && container.format && (
            <li>
              <b>Container format:</b> {container && container.format}{' '}
            </li>
          )}
          {video && video[0].codec && (
            <li>
              <b>Video codec: </b> {video && video[0].codec}
            </li>
          )}
          {audio && audio[0].codec && (
            <li>
              <b>Audio codec: </b> {audio && audio[0].codec}
            </li>
          )}
          {audio && (
            <li>
              <b>Audio configuration:</b> {audioTracks} tracks and {audioChannels} channels
            </li>
          )}
          {duration && (
            <li>
              <b>Duration: </b> {prettyMilliseconds(Number(duration || 0))}
            </li>
          )}
          <li>
            <b>Timestamp: </b> {file.timestamp}
          </li>
        </ul>
      </>
    );
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
                />
                {outputList.map((file) => (
                  <MediaCardFullWidth key={file.id} title={file.path} subheader="Aug 5th, 2021" />
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
