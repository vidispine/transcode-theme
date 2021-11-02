import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { parseTranscodePreset } from '@vidispine/vdt-js';
import { shapetag as ShapetagApi } from '@vidispine/vdt-api';

const ProfileContext = React.createContext();

export function useListProfiles() {
  return useQuery(
    ['getProfiles'],
    () =>
      ShapetagApi.listShapeTag().then(({ data = {} }) => {
        const { uri: profiles = [] } = data;
        return profiles.filter((profile) => profile !== 'original');
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

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

export function useGetProfile({ tagName }) {
  return useQuery(
    ['getProfile', tagName],
    () =>
      ShapetagApi.getShapeTag({ tagName }).then(({ data = {} }) => ({
        ...parseTranscodePreset(data),
        raw: parseProfile(data),
        name: data.name,
      })),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation(ShapetagApi.updateShapeTag, {
    onSuccess: () => {
      queryClient.invalidateQueries('getProfiles');
    },
  });
}
export function useDeleteProfile() {
  const queryClient = useQueryClient();
  return useMutation(ShapetagApi.removeShapeTag, {
    onSuccess: () => {
      queryClient.invalidateQueries('getProfiles');
    },
  });
}
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation(ShapetagApi.updateShapeTag, {
    onSuccess: (_, { tagName }) => {
      queryClient.invalidateQueries(['getProfile', tagName]);
    },
  });
}

export const ProfileProvider = ({ children }) => {
  const { data = [], refetch: onRefresh, isLoading, isError } = useListProfiles();
  const [search, setSearch] = React.useState('');
  const [showDefault, setShowDefault] = React.useState(false);
  const onSearch = (v) => setSearch(v);
  const profiles = React.useMemo(() => {
    let tags = data;
    if (!showDefault) tags = tags.filter((tag) => !tag.startsWith('__'));
    if (search) tags = tags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return tags;
  }, [search, showDefault, data]);
  return (
    <ProfileContext.Provider
      value={{ profiles, onSearch, showDefault, setShowDefault, onRefresh, isLoading, isError }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export function useProfiles() {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
