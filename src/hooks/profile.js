import { useQuery, useQueryClient, useMutation } from 'react-query';

import { shapetag as ShapetagApi } from '@vidispine/vdt-api';
import { parseTranscodePreset } from '@vidispine/vdt-js';

import { parseProfile } from '../utils/utils';

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
