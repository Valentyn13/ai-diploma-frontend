import Theme from '@common/theme';
import React, { FC, PropsWithChildren } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const ParallaxScrollView: FC<
  PropsWithChildren & {
    image?: string;
    srcImage?: Source;
    parallaxEnabled?: boolean;
    backgroundColor?: string;
    contentBackgroundColor?: string;
    parallaxHeaderHeight?: number;
    renderForeground?: () => JSX.Element;
    renderStickyHeader?: () => JSX.Element;
  }
> = ({
  children,
  image,
  srcImage,
  backgroundColor = Theme.colors.bgColor,
  parallaxEnabled = true,
  contentBackgroundColor = Theme.colors.bgColor,
  parallaxHeaderHeight = 200,
  renderForeground = () => null,
  renderStickyHeader = () => null,
}) => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-parallaxHeaderHeight, 0],
      [2, 1],
    );
    const translateY = interpolate(
      scrollY.value,
      [-parallaxHeaderHeight, 0, parallaxHeaderHeight],
      [-parallaxHeaderHeight / 2, 0, parallaxHeaderHeight * 0.75],
    );
    return {
      height: parallaxHeaderHeight,
      transform: [{ scale }, { translateY }],
    };
  });

  const foregroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, parallaxHeaderHeight],
      [1, 0],
    );
    return { opacity };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: contentBackgroundColor }]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}>
        <Animated.View
          style={[
            parallaxEnabled
              ? headerStyle
              : {
                  height: parallaxHeaderHeight,
                },
            styles.header,
            { backgroundColor },
          ]}>
          {image && (
            <Image
              source={{ uri: image }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          )}
          {srcImage && (
            <FastImage
              source={srcImage}
              style={[StyleSheet.absoluteFill]}
              resizeMode="cover"
            />
          )}

          <Animated.View style={[StyleSheet.absoluteFill, foregroundStyle]}>
            {renderForeground()}
          </Animated.View>
        </Animated.View>
        <View style={{ marginTop: parallaxHeaderHeight }}>{children}</View>
      </Animated.ScrollView>
      {renderStickyHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default ParallaxScrollView;
