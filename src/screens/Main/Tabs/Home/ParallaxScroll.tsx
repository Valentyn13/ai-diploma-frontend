import image from '@common/assets/images';
import {
  birdRotateToLeftAndScaleToOne,
  cloudOneOneOpacityAppear,
  cloudOneRightGlide,
  cloudTwoRightGlide,
  sunGlideToTop,
} from '@common/components/animation/HomeScene';
import { getPeriodOfDay } from '@utils/time';
import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { LinearGradient } from 'react-native-gradients';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const sunriseGradientColorList = [
  {
    offset: '0%',
    color: '#C3CBF1',
    opacity: '1',
  },
  {
    offset: '85%',
    color: '#FFF7EE',
    opacity: '1',
  },
  {
    offset: '100%',
    color: '#FFF7EE',
    opacity: '1',
  },
];

const sunsetGradientColorList = [
  {
    offset: '0%',
    color: '#7C88BF',
    opacity: '1',
  },
  {
    offset: '75%',
    color: '#FFF7EE',
    opacity: '1',
  },
  {
    offset: '100%',
    color: '#FFF7EE',
    opacity: '1',
  },
];

const ParallaxScroll: FC<PropsWithChildren> = ({ children }) => {
  const scrollY = useSharedValue(0);

  const timeOfTheDay = getPeriodOfDay();

  const isSunrise =
    timeOfTheDay === 'morning' ||
    timeOfTheDay === 'noon' ||
    timeOfTheDay === 'afternoon';

  // const isSunrise = false;

  const gradientColorList = isSunrise
    ? sunriseGradientColorList
    : sunsetGradientColorList;

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
            height: 323,
          },
        ]}>
        <FastImage
          source={image('home_card_cloud')}
          resizeMode="cover"
          className="absolute bottom-4 z-[9999] right-0 w-[132px] h-[65px]"
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: 130,
            right: -70,
            zIndex: 1,
            width: 216,
            height: 136,
          }}>
          <FastImage
            resizeMode="cover"
            className="w-full h-full"
            source={image('home_back_clouds')}
          />
        </Animated.View>
        <Animated.View
          entering={birdRotateToLeftAndScaleToOne}
          style={{
            position: 'absolute',
            bottom: isSunrise ? 80 : 85,
            right: isSunrise ? 120 : 123,
            zIndex: 6,
            width: 93,
            height: 69,
          }}>
          <FastImage
            resizeMode="cover"
            className="w-full h-full"
            source={image(isSunrise ? 'home_birds' : 'home_night_stars')}
          />
        </Animated.View>
        <Animated.View
          entering={cloudOneOneOpacityAppear}
          style={{
            position: 'absolute',
            bottom: 30,
            left: 90,
            zIndex: 5,
            width: 251,
            height: 100,
          }}>
          <FastImage
            className="w-full h-full"
            resizeMode="cover"
            source={image('home_cloud_1_1')}
          />
        </Animated.View>
        <Animated.View
          entering={cloudOneRightGlide}
          style={{
            position: 'absolute',
            bottom: -15,
            left: -10,
            zIndex: 4,
            width: 251,
            height: 100,
          }}>
          <FastImage
            className="w-full h-full"
            resizeMode="cover"
            source={image('home_cloud_1')}
          />
        </Animated.View>
        <Animated.View
          entering={cloudTwoRightGlide}
          style={{
            position: 'absolute',
            bottom: 0,
            right: -70,
            zIndex: 7,
            width: 314,
            height: 125,
          }}>
          <FastImage
            className="w-full h-full"
            resizeMode="cover"
            source={image('home_cloud_2')}
          />
        </Animated.View>
        <Animated.View
          entering={cloudTwoRightGlide}
          style={{
            position: 'absolute',
            bottom: 35,
            right: -180,
            zIndex: 4,
            width: 314,
            height: 125,
          }}>
          <FastImage
            className="w-full h-full"
            resizeMode="cover"
            source={image('home_cloud_3')}
          />
        </Animated.View>
        <Animated.View
          entering={sunGlideToTop}
          style={{
            position: 'absolute',
            bottom: isSunrise ? 0 : 40,
            right: isSunrise ? 30 : 60,
            zIndex: 5,
            width: isSunrise ? 216 : 160,
            height: isSunrise ? 216 : 160,
          }}>
          <FastImage
            className="w-full h-full"
            resizeMode="cover"
            source={image(isSunrise ? 'home_sun' : 'home_moon')}
          />
        </Animated.View>
        <LinearGradient colorList={gradientColorList} angle={-90} />
      </Animated.View>
      <Animated.ScrollView
        className={styles.scrollViewContent}
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
