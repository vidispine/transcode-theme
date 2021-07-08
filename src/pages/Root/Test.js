import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  const src = id.replace(/_/g, '/');
  return (
    <video src={src} controls>
      <track kind="captions" />
    </video>
  );
};
