import React from 'react';
import { useQuery } from 'react-query';
import { shapetag as ShapetagApi } from '@vidispine/vdt-api';

const ProfileContext = React.createContext();

const formatBitrate = (bits = 0) => {
  const units = ['B/s', 'Kb/s', 'Mb/s'];
  const i = Math.floor(Math.log(bits) / Math.log(1000));
  return `${(bits / 1000 ** i).toFixed(0)} ${units[i]}`;
};

export function useListProfiles() {
  return useQuery(
    ['profile'],
    () =>
      ShapetagApi.listShapeTag().then(({ data = {} }) => {
        const { uri: profiles = [] } = data;
        return profiles;
      }),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

const parseProfile = (data) => {
  const profile = {};
  const { name, format, video, audio, metadata } = data;

  if (name) profile.name = name;
  if (format) profile.format = format;

  if (video) {
    const { codec, bitrate, scaling, resolution, framerate } = video;
    if (codec) profile.videoCodec = codec;
    if (bitrate) profile.bitrate = formatBitrate(bitrate);
    if (scaling || resolution) {
      const { width, height } = scaling || resolution;
      if (width && height) profile.resolution = `${width} x ${height}`;
      if (width) profile.width = width;
      if (height) profile.height = height;
    }
    if (framerate) {
      const { denominator = 1, numerator = 1 } = framerate;
      profile.framerate = denominator / numerator;
    }
  }

  if (audio) {
    const { codec } = audio;
    if (codec) profile.audioCodec = codec;
  }

  if (metadata) {
    const { field = [] } = metadata;
    for (let i = 0; i < field.length; i += 1) {
      const { key, value } = field[i];
      profile[key] = value;
    }
  }

  return profile;
};

export function useGetProfile({ tagName }) {
  return useQuery(
    ['profile', tagName],
    () => ShapetagApi.getShapeTag({ tagName }).then(({ data = {} }) => parseProfile(data)),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  );
}

export const ProfileProvider = ({ children }) => {
  const { data = [], isLoading, isError } = useListProfiles();
  const [search, setSearch] = React.useState('');
  const onSearch = (v) => setSearch(v);
  const profiles = React.useMemo(
    () => data.filter((s) => s.toLowerCase().includes(search)),
    [search, data],
  );
  return (
    <ProfileContext.Provider value={{ profiles, onSearch, isLoading, isError }}>
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
