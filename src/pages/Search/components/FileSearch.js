import React, { useState, useEffect } from 'react';
import { SearchInput, MediaCardFullWidth } from '@vidispine/vdt-materialui';
import { Button, List, CardActions, IconButton, Checkbox, ListItem } from '@material-ui/core';
import { SwitchVideo, CloudDownload } from '@material-ui/icons';
import parseFileSize from 'filesize';
import useSearchFiles from '../hooks/useSearchFiles';
import ShapeInfo from './ShapeInfo';
import { getMetadataFieldValue } from '../../../utils/utils';

const ActionsComponent = ({ selected, onSelect, item, transcodeAvailable, openTranscodeModal }) => {
  return (
    <CardActions disableSpacing style={{ padding: 0 }}>
      {transcodeAvailable && (
        <IconButton onClick={() => openTranscodeModal(item)}>
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

const FileSearch = ({ classes, storageId, transcodeAvailable, openTranscodeModal }) => {
  const { onSearch, itemListType, hasLoaded, isLoading } = useSearchFiles(storageId);
  const [first, setFirst] = useState(1);
  const [searchString, setSearchString] = useState('');
  const { item: itemList = [] } = hasLoaded ? itemListType : {};
  useEffect(() => {
    onSearch(searchString, first);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [first]);

  const renderShapeInfo = (shape) => {
    if (!hasLoaded) {
      return <p>Technical metadata extraction not completed.</p>;
    }
    return <ShapeInfo file={{}} shape={shape} />;
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
        {itemList.map((item) => (
          <ListItem key={item.id}>
            <MediaCardFullWidth
              className="search-result"
              key={item.id}
              title={getMetadataFieldValue(item.metadata, 'originalFilename')}
              subheader={parseFileSize(1000000)}
              ExpandComponent={false}
              content={renderShapeInfo(item.shape[0])}
              ContentProps={{ component: 'div' }}
              ActionsComponent={ActionsComponent}
              ActionsProps={{
                transcodeAvailable,
                openTranscodeModal,
                item,
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FileSearch;
