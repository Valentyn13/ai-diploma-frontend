import Background from '@common/components/Background';
import { CircleButton } from '@common/components/buttons/CircleButton';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

import FadingText from './FadingText';
import Square from './Square';

const duration = 4000;

const ExercisesPlayer = ({ route, navigation }) => {
  const { exercise } = route.params;

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
      <Square duration={duration}>
        <FadingText duration={duration} />
      </Square>
    </View>
  );
};

export default ExercisesPlayer;
