import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Track,
} from 'react-native-track-player';

// Define the context shape
interface TrackPlayerContextType {
  addTrack: (track: Track) => Promise<void>;
  isTrackPlayerInitialized: boolean;
}

const TrackPlayerContext = createContext<TrackPlayerContextType | undefined>(
  undefined,
);

// Provider component type
interface TrackPlayerProviderProps {
  children: ReactNode;
}

export const TrackPlayerProvider: React.FC<TrackPlayerProviderProps> = ({
  children,
}) => {
  const [isTrackPlayerInitialized, setTrackPlayerInitialized] = useState(false);

  const initTrackPlayer = async () => {
    await TrackPlayer.setupPlayer();

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Stop,
        Capability.Pause,
        Capability.SeekTo,
        Capability.JumpForward,
        Capability.JumpBackward,
      ],
      forwardJumpInterval: 15,
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

    setTrackPlayerInitialized(true);
  };

  useEffect(() => {
    initTrackPlayer();

    return () => {
      TrackPlayer.stop();
    };
  }, []);

  const addTrack = async (track: Track) => {
    if (isTrackPlayerInitialized) {
      await TrackPlayer.add(track);
    }
  };

  return (
    <TrackPlayerContext.Provider value={{ addTrack, isTrackPlayerInitialized }}>
      {children}
    </TrackPlayerContext.Provider>
  );
};

export const useTrackPlayer = (): TrackPlayerContextType => {
  const context = useContext(TrackPlayerContext);
  if (context === undefined) {
    throw new Error('useTrackPlayer must be used within a TrackPlayerProvider');
  }
  return context;
};
