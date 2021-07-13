import React from 'react';
import { useQuery } from 'react-query';
import { storage as StorageApi, resource as ResourceApi } from '@vidispine/vdt-api';
import filenameScript from '../pages/Settings/filenameScript';

const ConfigurationContext = React.createContext();

const parseStorages = ({ storage: storageList }) => {
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
      const asd = new URL(uriString);
      let { protocol, pathname, search } = asd;
      if (pathname.startsWith('//')) pathname = pathname.slice(2);
      if (protocol.endsWith(':')) protocol = protocol.slice(0, -1);
      if (search.startsWith('?')) search = search.slice(1);
      const [access, bucket] = pathname.split('@');
      const [accessKey, secretKey] = access.split(':_VSENC__');
      const [name, ...folderPath] = bucket.split('/');
      const path = folderPath.join('/');
      const queries = search.split('&').reduce((a, c) => {
        const [key, value] = c.split('=');
        return { ...a, [key]: value };
      }, {});
      Object.assign(output, {
        accessKey,
        secretKey,
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

const parseResources = ({ resource: resourceList }) =>
  resourceList.map(({ id, vidinet }) => ({ id, ...vidinet }));

export function useGetStorages() {
  return useQuery(
    ['storages'],
    () => StorageApi.listStorage({}).then(({ data = {} }) => parseStorages(data)),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

export function useGetResources() {
  return useQuery(
    ['resources'],
    () =>
      ResourceApi.listResourceType({ resourceType: 'vidinet' }).then(({ data = {} }) =>
        parseResources(data),
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

export function useConfiguration() {
  const context = React.useContext(ConfigurationContext);
  return context;
}

export const ConfigurationProvider = ({ children }) => {
  const {
    data: storages,
    isLoading: isLoadingStorages,
    isError: isErrorStorages,
  } = useGetStorages();
  const {
    data: resources,
    isLoading: isLoadingResources,
    isError: isErrorResources,
  } = useGetResources();

  const isLoading = isLoadingStorages || isLoadingResources;
  const isError = isErrorStorages || isErrorResources;

  const onUpdateStorage = ({ input, output }) => {
    const {
      protocol,
      accessKey,
      secretKey,
      name,
      path,
      // region,
      id: storageMethodId,
      storageId,
    } = {
      ...input,
      ...output,
    };
    let uri = `${protocol}://${accessKey}:_VSENC__${secretKey}@${name}/${path}`;
    if (uri.charAt(uri.length - 1) !== '/') uri = uri.concat('/');
    // if (region && region !== 'auto') uri = uri.concat(`?region=${region}`);
    if (storageId) {
      return StorageApi.modifyStorageMethod({ storageMethodId, storageId, queryParams: { uri } });
    }
    const storageDocument = {
      type: 'LOCAL',
      capacity: 800000000000,
      method: [{ uri, read: true, write: true, browse: true }],
      metadata: { field: [] },
    };
    if (input) {
      storageDocument.metadata.field = [{ key: 'transcodeThemeSourceStorage', value: true }];
    } else if (output) {
      storageDocument.metadata.field = [
        { key: 'transcodeThemeOutputStorage', value: true },
        { key: 'filenameScript', value: filenameScript },
      ];
    }
    return StorageApi.createStorage({ storageDocument });
  };

  return (
    <ConfigurationContext.Provider
      value={{ onUpdateStorage, storages, resources, isLoading, isError }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationContext;
