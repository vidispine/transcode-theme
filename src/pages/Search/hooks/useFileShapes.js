import { useState } from 'react';
import { file as FileApi } from '@vidispine/vdt-api';

const useFileShapes = () => {
  const [state, setState] = useState({
    fileShapes: {},
    hasShapesLoaded: false,
  });
  const setHasLoaded = (hasLoaded) => {
    setState((prev) => ({
      ...prev,
      hasLoaded,
    }));
  };
  const onListShapes = (fileIds = []) => {
    setHasLoaded(false);
    const reqs = [];
    fileIds.forEach((fileId) => {
      reqs.push(
        FileApi.listFileShapes({
          fileId,
        }),
      );
    });
    Promise.all(reqs)
      .then((result) => result.map((r) => r.json()))
      .then((data) => {
        const fileShapes = {};
        data.forEach((res, i) => {
          fileShapes[fileIds[i]] = res.shape ? res.shape[0] : {};
        });
        setState({
          hasShapesLoaded: true,
          fileShapes,
        });
      });
  };
  return {
    onListShapes,
    ...state,
  };
};

export default useFileShapes;
