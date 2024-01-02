import React, { FC, PropsWithChildren } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 300;

const ParallaxScrollView: FC<PropsWithChildren & { image: string }> = ({
  children,
  image,
}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-HEADER_HEIGHT, 0], [2, 1]);
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  return (
    <Animated.ScrollView
      style={styles.container}
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Image style={styles.image} source={{ uri: image }} />
      </Animated.View>

      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8EE',
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

export default ParallaxScrollView;
