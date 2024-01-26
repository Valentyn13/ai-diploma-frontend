import Background from '@common/components/Background';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { EXERCISES } from '@common/constants';
import theme from '@common/theme';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  runOnJS,
  useEvent,
  useHandler,
} from 'react-native-reanimated';

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

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

const Container = ({
  children,
  exercise: { title, description, illustration: Illustration },
  ...props
}: any) => {
  return (
    <View className="flex items-center justify-center" {...props}>
      <View className="relative flex items-center justify-center px-5">
        <View className="absolute w-full items-center -top-36">
          <Illustration width="50%" height={100} />
        </View>
        <Text className="text-white text-3xl font-bold mb-4">{title}</Text>
        <Text className="text-white text-lg font-light text-center">
          {description}
        </Text>
      </View>
      {children}
    </View>
  );
};

const Exercises = ({ navigation }) => {
  const [selected, setSelected] = useState(0);

  const onStart = () =>
    navigation.navigate('ExercisesPlayer', {
      key: EXERCISES[selected].key,
    });

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      'worklet';
      runOnJS(setSelected)(e.position);
    },
  });

  return (
    <View className="flex-1">
      <Background seedString={EXERCISES[selected].key} />
      <View className="absolute w-full h-full bg-black/20" />

      <SafeAreaView className="flex-1">
        <View className="z-10">
          <View className="absolute left-5 top-5">
            <CircleButton
              backgroundColor="#00000060"
              color="#fff"
              onPress={navigation.goBack}
              size={40}
              icon="chevron-right"
            />
          </View>
        </View>
        <AnimatedPager
          style={styles.pagerView}
          initialPage={selected}
          onPageScroll={handler}>
          {EXERCISES.map(exercise => (
            <Container key={exercise.key} exercise={exercise} />
          ))}
        </AnimatedPager>
        <View className="absolute w-full bottom-5 p-5">
          <View className="flex flex-row justify-center items-center mb-5">
            {EXERCISES.map((e, index) => (
              <View
                key={e.key}
                className={`w-2 h-2 rounded-full mx-1 transition duration-300
                 ${index === selected ? 'bg-white w-4 h-4' : 'bg-white/60'}`}
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={onStart}
            className="flex items-center px-10 py-4 rounded-md w-full bottom-0 bg-white">
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: theme.fonts!.regular,
                color: '#000',
                fontSize: 20,
              }}>
              בואו נתחיל
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default Exercises;
