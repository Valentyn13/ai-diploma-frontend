import { colors } from '@common/theme';
import logger from '@utils/logger';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

const BgMusicPlayer = ({ source, paused }: any) => (
  <Video
    source={source}
    onError={error => {
      logger.log('error', JSON.stringify(error));
    }}
    disableFocus
    audioOnly
    playInBackground
    repeat
    playWhenInactive
    paused={paused}
  />
);

const Player = () => {
  const [isInhale, setIsInhale] = useState(true);

  // useEffect(() => {
  //   const soundInterval = setInterval(() => {
  //     setIsInhale(inhale => !inhale);
  //   }, 8000);

  //   return () => {
  //     clearInterval(soundInterval);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: '100%',
          height: 400,
        }}
        source={require('./box.json')} // Update with your animation file
        autoPlay
        loop
      />
      <BgMusicPlayer
        source={isInhale ? require('./inhale.mp3') : require('./exhale.mp3')}
        paused={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
  },
});

export default Player;
