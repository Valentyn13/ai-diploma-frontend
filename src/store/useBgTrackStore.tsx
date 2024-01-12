import { BgTrackID } from '@common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TrackStore = {
  selectedTrack: BgTrackID;
  setSelectedTrack: (id: BgTrackID) => void;
  volume: number;
  setVolume: (volume: number) => void;
};

export const useBgTrackStore = create<TrackStore>(
  // @ts-ignore
  persist(
    set => ({
      selectedTrack: 'ocean',
      volume: 0.3,
      setSelectedTrack: (selectedTrack: BgTrackID) => set({ selectedTrack }),
      setVolume: (volume: number) => set({ volume }),
    }),
    {
      name: 'bg-track-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);
