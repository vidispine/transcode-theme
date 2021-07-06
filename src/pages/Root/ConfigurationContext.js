import React from 'react';
import { useQuery } from 'react-query';
import { storage as StorageApi, resource as ResourceApi } from '@vidispine/vdt-api';

const ConfigurationContext = React.createContext();

const parseStorages = (storageList) => {
  let sourceStorage = null;
  let outputStorage = null;
  storageList.storage.forEach((storage) => {
    if (!storage.metadata.field) {
      return;
    }
    storage.metadata.field.forEach((field) => {
      if (field.key === 'transcodeThemeSourceStorage') {
        sourceStorage = storage.id;
      }
      if (field.key === 'transcodeThemeOutputStorage') {
        outputStorage = storage.id;
      }
    });
  });
  return { sourceStorage, outputStorage };
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

  return (
    <ConfigurationContext.Provider value={{ storages, resources, isLoading, isError }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationContext;
