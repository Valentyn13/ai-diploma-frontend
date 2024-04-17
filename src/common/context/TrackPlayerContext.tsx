import { captureException } from '@sentry/react-native';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  Track,
  useTrackPlayerEvents,
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

const useTrackPlayerEventsHandler = () => {
  useTrackPlayerEvents(
    [
      Event.RemotePlay,
      Event.RemotePause,
      Event.RemoteStop,
      Event.RemoteJumpForward,
      Event.RemoteJumpBackward,
      Event.PlaybackError,
      Event.PlaybackActiveTrackChanged,
    ],
    async event => {
      switch (event.type) {
        case Event.RemotePlay:
          TrackPlayer.play();
          break;
        case Event.RemotePause:
          TrackPlayer.pause();
          break;
        case Event.RemoteStop:
          TrackPlayer.stop();
          break;
        case Event.RemoteJumpForward:
          const positionForward = await TrackPlayer.getProgress();
          TrackPlayer.seekTo(positionForward.position + event.interval);
          break;
        case Event.RemoteJumpBackward:
          const positionBackward = await TrackPlayer.getProgress();
          TrackPlayer.seekTo(positionBackward.position - event.interval);
          break;
        case Event.PlaybackError:
          captureException(event);
          Alert.alert('בעיה בניגון התרגול הנבחר', 'אנא נסו שנית');
          break;

        default:
          break;
      }
    },
  );
};

export const TrackPlayerProvider: React.FC<TrackPlayerProviderProps> = ({
  children,
}) => {
  const [isTrackPlayerInitialized, setTrackPlayerInitialized] = useState(false);
  useTrackPlayerEventsHandler();

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
