import Background from '@common/components/Background';
import { CircleButton } from '@common/components/buttons/CircleButton';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import Square from './CircleExercise';
import FadingText from './FadingText';

const duration = 4000;

const ExercisesPlayer = ({ route, navigation }) => {
  const { exercise } = route.params || { exercise: { key: 'sleep' } };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <Background seedString={exercise.key} />
      <SafeAreaView className="w-full flex-1 z-10">
        <View className="flex-1">
          <View className="absolute left-5 top-5">
            <CircleButton
              backgroundColor="#00000060"
              color="#fff"
              onPress={navigation.goBack}
              size={40}
              icon="x"
            />
          </View>
        </View>
      </SafeAreaView>
      <View className="absolute flex-1 w-full h-full">
        <Square sequences={[duration, duration, duration, duration]}>
          <FadingText duration={duration} />
        </Square>
      </View>
    </View>
  );
};

export default ExercisesPlayer;
