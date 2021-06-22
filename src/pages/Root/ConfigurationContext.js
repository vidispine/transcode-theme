import React from 'react';
import { useQuery } from 'react-query';
import { storage as StorageApi } from '@vidispine/vdt-api';

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

export function useConfiguration() {
  const context = React.useContext(ConfigurationContext);
  return context;
}

export const ConfigurationProvider = ({ children }) => {
  const { data, isLoading, isError } = useGetStorages();

  return (
    <ConfigurationContext.Provider value={{ ...data, isLoading, isError }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export default ConfigurationContext;
