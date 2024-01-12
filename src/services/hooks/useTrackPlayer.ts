import { useEffect } from 'react';
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
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [
          Capability.Play,
          Capability.Stop,
          Capability.Pause,
          Capability.SeekTo,
          Capability.JumpForward,
          Capability.JumpBackward,
          Capability.Like,
          Capability.Dislike,
        ],
        forwardJumpInterval: 15,
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Like,
        ],
      });
    };

    initTrackPlayer();
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
      Event.RemoteSeek,
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
        case Event.RemoteSeek:
          TrackPlayer.seekTo(event.position);
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
};

export default useTrackPlayer;
