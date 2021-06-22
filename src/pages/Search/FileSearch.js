import React, { useState, useEffect } from 'react';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import { Button, List, CardActions, IconButton, Checkbox, ListItem } from '@material-ui/core';
import { SwitchVideo, CloudDownload } from '@material-ui/icons';
import parseFileSize from 'filesize';
import ShapeInfo from './ShapeInfo';
import useSearchFiles from './hooks/useSearchFiles';
import useFileShapes from './hooks/useFileShapes';

const ActionsComponent = ({ selected, onSelect, transcodeAvailable }) => {
  return (
    <CardActions disableSpacing style={{ padding: 0 }}>
      {transcodeAvailable && (
        <IconButton>
          <SwitchVideo />
        </IconButton>
      )}
      <IconButton>
        <CloudDownload />
      </IconButton>
      <Checkbox checked={selected} onChange={onSelect} />
    </CardActions>
  );
};

const FileSearch = ({ classes, storageId, transcodeAvailable }) => {
  const { onSearch, fileListType, hasLoaded, isLoading } = useSearchFiles(storageId);
  const { onListShapes, hasShapesLoaded, fileShapes } = useFileShapes();
  const [first, setFirst] = useState(0);
  const [searchString, setSearchString] = useState('');
  const { file: fileList = [] } = hasLoaded ? fileListType : {};
  useEffect(() => {
    if (hasLoaded) {
      onListShapes(fileList.map((file) => file.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);
  useEffect(() => {
    onSearch(searchString, first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first]);

  const renderShapeInfo = (file) => {
    if (!hasShapesLoaded || !fileShapes[file.id] || Object.keys(fileShapes[file.id]).length === 0) {
      return <p>Technical metadata extraction not completed.</p>;
    }
    return <ShapeInfo file={file} shape={fileShapes[file.id]} />;
  };

  return (
    <>
      <SearchInput
        className={classes.SearchInput}
        onSubmit={onSearch}
        submitting={hasLoaded && isLoading}
        onChange={setSearchString}
      />
      <Button
        onClick={() => {
          setFirst(Math.max(0, first - 10));
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
              ActionsComponent={ActionsComponent}
              ActionsProps={{ transcodeAvailable }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FileSearch;
