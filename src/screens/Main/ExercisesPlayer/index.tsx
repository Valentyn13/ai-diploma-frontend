import Background from '@common/components/Background';
import BgSelector from '@common/components/buttons/BgSelector';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { EXERCISES } from '@common/constants';
import useTimer from '@services/hooks/useTimer';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import CircleExercise from './CircleExercise';
import FadingText from './FadingText';

const ExercisesPlayer = ({ route, navigation }) => {
  const exercise = useMemo(
    () => EXERCISES.find(({ id }) => id === route.params.id) || EXERCISES[0],
    [route.params.id],
  );

  const [startExercise, setStartExercise] = useState(false);
  const handleCompleteInitialTimer = () => setStartExercise(true);
  const countdownInitial = useTimer(3, handleCompleteInitialTimer);

  const countdownExercise = useTimer(
    120,
    () => navigation.goBack(),
    startExercise,
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
        <View className="flex flex-row justify-between p-4">
          <CircleButton
            backgroundColor="#00000060"
            color="#fff"
            onPress={navigation.goBack}
            size={40}
            icon="x"
          />
          <BgSelector />
        </View>
      </SafeAreaView>
      <View className="absolute flex-1 w-full h-full flex items-center justify-center">
        {!startExercise ? (
          <Text
            style={{
              color: 'white',
              fontSize: scale(100),
              textAlign: 'center',
            }}>
            {countdownInitial}
          </Text>
        ) : (
          <>
            <CircleExercise
              sequences={exercise.sequences.map(
                ({ seconds }) => seconds * 1000,
              )}>
              <FadingText sequences={exercise.sequences} />
            </CircleExercise>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                textAlign: 'center',
                position: 'absolute',
                bottom: 20,
                width: '100%',
              }}>
              זמן נותר: {countdownExercise} שניות
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ExercisesPlayer;
