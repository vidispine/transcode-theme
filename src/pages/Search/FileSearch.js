import React, { useState, useEffect } from 'react';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import { Button, List, ListItem } from '@material-ui/core';
import parseFileSize from 'filesize';
import ShapeInfo from './ShapeInfo';
import useSearchFiles from './hooks/useSearchFiles';
import useFileShapes from './hooks/useFileShapes';

const FileSearch = ({ classes, storageId }) => {
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
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FileSearch;
