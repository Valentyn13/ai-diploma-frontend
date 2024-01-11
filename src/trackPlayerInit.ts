import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
} from 'react-native-track-player';

TrackPlayer.addEventListener(Event.RemotePlay, () => {
  console.log('im here');
});
TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

// TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
// TrackPlayer.addEventListener('remote-previous', () =>
//   TrackPlayer.skipToPrevious(),
// );

export default async function trackPlayerInit() {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
}
