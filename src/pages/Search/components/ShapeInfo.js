import React from 'react';
import prettyMilliseconds from 'pretty-ms';

function ShapeInfo({ shape, file }) {
  if (!shape) {
    return <p>Technical metadata extraction not completed.</p>;
  }
  console.log('SHAPE', shape);
  const container = shape.containerComponent;
  const video = shape.videoComponent;
  const audio = shape.audioComponent;
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
}

export default ShapeInfo;
