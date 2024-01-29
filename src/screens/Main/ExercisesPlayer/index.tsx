import Background from '@common/components/Background';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { EXERCISES } from '@common/constants';
import React, { useMemo } from 'react';
import { SafeAreaView, View } from 'react-native';

import CircleExercise from './CircleExercise';
import FadingText from './FadingText';

const ExercisesPlayer = ({ route, navigation }) => {
  const exercise = useMemo(
    () => EXERCISES.find(({ id }) => id === route.params.id) || EXERCISES[0],
    [route.params.id],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <Background seed={exercise.id} />
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
        <CircleExercise
          sequences={exercise.sequences.map(({ seconds }) => seconds * 1000)}>
          <FadingText sequences={exercise.sequences} />
        </CircleExercise>
      </View>
    </View>
  );
};

export default ExercisesPlayer;
