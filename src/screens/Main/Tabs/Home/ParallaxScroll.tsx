import { getBGImageByTime } from '@utils/time';
import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const BGS = {
  sunrise: require('./bgs/morning.png'),
  sunset: require('./bgs/night.png'),
};

const ParallaxScroll: FC<PropsWithChildren> = ({ children }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollY.value * 0.5 }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        className="relative"
        style={[
          StyleSheet.absoluteFillObject,
          backgroundStyle,
          {
            height: 290,
          },
        ]}>
        <FastImage
          resizeMode="cover"
          source={BGS[getBGImageByTime()]}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {},
});

export default ParallaxScroll;
