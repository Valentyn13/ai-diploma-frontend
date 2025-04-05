import Button from '@common/components/buttons/Button';
import Theme from '@common/theme';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  runOnJS,
  useEvent,
  useHandler,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Categories,
  Experience,
  Gender,
  Intro,
  Intro2,
  Intro3,
  Michael,
} from './steps';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

const ONBOARDING_PAGES = [
  Intro,
  Intro2,
  Intro3,
  Michael,
  Gender,
  Categories,
  Experience,
];

export function usePagerScrollHandler(handlers: any, dependencies?: any) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<any>(
    event => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer,
  );
}

const OnBoarding = ({ navigation: { navigate } }) => {
  const ref = useRef<PagerView>(null);
  const [selected, setSelected] = useState(0);
  const onStart = () => navigate('Auth', { screen: 'PreLogin' });

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      runOnJS(setSelected)(e.position);
    },
  });

  return (
    <View className="flex-1">
      {/* <Background seed="default" customColors={['#FBEFDD', '#FBEFDD']} /> */}
      <SafeAreaView
        edges={['top']}
        style={{
          backgroundColor:
            selected === 4 || selected === 5 || selected === 6
              ? Theme.colors.bgColor
              : Theme.colors.bgColor,
        }}
      />

      <SafeAreaView
        edges={['bottom', 'right', 'left']}
        className="flex-1 bg-primary-bg">
        <AnimatedPager
          ref={ref}
          style={styles.pagerView}
          initialPage={selected}
          onPageScroll={handler}>
          {ONBOARDING_PAGES.map((Page, index) => (
            <Page key={index} />
          ))}
        </AnimatedPager>
        <View className="absolute w-full bottom-5 p-5">
          <View className="flex flex-row justify-center items-center mb-5">
            {ONBOARDING_PAGES.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 transition duration-300
                 ${index === selected ? 'bg-black/80 w-4 h-4' : 'bg-black/40'}`}
              />
            ))}
          </View>
          <Button
            variant="primary"
            onPress={() => {
              if (selected < ONBOARDING_PAGES.length - 1) {
                ref.current?.setPage(selected + 1);
              } else {
                onStart();
              }
            }}
            title="Далі"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: Theme.colors.bgColor,
  },
});

export default OnBoarding;
