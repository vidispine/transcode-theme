/* eslint-disable import/prefer-default-export */
export const getMetadataFieldValue = (metadata, fieldName) => {
  if (!metadata.timespan) {
    return null;
  }
  let result = null;
  metadata.timespan.forEach((timespan) => {
    if (!timespan.field) {
      return;
    }
    timespan.field.forEach((field) => {
      if (field.name === fieldName) {
        result = field.value[0].value;
      }
    });
  });
  return result;
};
export const parseProfile = (data) => {
  const extraData = {};
  const audio = {};
  const { metadata, ...rest } = data;
  if (metadata) {
    const { field = [] } = metadata;
    for (let i = 0; i < field.length; i += 1) {
      const { key, value } = field[i];
      if (key === 'sampleSize' || key === 'sampleRate') audio[key] = Number(value);
      else extraData[key] = value;
    }
  }
  return { ...rest, ...extraData, audio: { ...rest.audio, ...audio } };
};

export const parseStorages = ({ storage: storageList }) => {
  return storageList.reduce((acc, curr) => {
    const { method: methodList = [], metadata = {}, id: storageId } = curr;
    const output = {};
    let storageType;
    const { field = [] } = metadata;
    if (field.length) {
      if (field.some(({ key }) => key === 'transcodeThemeSourceStorage')) storageType = 'input';
      if (field.some(({ key }) => key === 'transcodeThemeOutputStorage')) storageType = 'output';
      if (!storageType) return acc;
      const { value = '-' } = field.find(({ key }) => key === 'description') || {};
      output.description = value;
    }

    const [defaultMethod] = methodList;
    if (defaultMethod) {
      const { uri: uriString, ...params } = defaultMethod;
      const methodUri = new URL(uriString);
      let { protocol, pathname, search } = methodUri;
      if (pathname.startsWith('//')) pathname = pathname.slice(2);
      if (protocol.endsWith(':')) protocol = protocol.slice(0, -1);
      if (search.startsWith('?')) search = search.slice(1);
      const [access, bucket] = pathname.split('@');
      const [accessKey] = access.split(':_VSENC__');
      const [name, ...folderPath] = bucket?.split('/') || [];
      const path = folderPath.join('/');
      const queries = search.split('&').reduce((a, c) => {
        const [key, value] = c.split('=');
        return { ...a, [key]: value };
      }, {});
      Object.assign(output, {
        accessKey,
        name,
        path,
        protocol,
        storageId,
        ...queries,
        ...params,
      });
    }
    return { ...acc, [storageType]: output };
  }, {});
};
