import { captureException } from '@sentry/react-native';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const useTrackPlayerSetup = () => {
  useEffect(() => {
    const initTrackPlayer = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
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
    };

    initTrackPlayer();

    return () => {
      TrackPlayer.stop();
    };
  }, []);
};

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

const useTrackPlayer = () => {
  useTrackPlayerSetup();
  useTrackPlayerEventsHandler();

  return;
};

export default useTrackPlayer;
