import image from '@common/assets/images';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import { chooseExperience } from '@store/actions';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import PageTitle from '../PageTitle';

const { width } = Dimensions.get('screen');

const ExperienceOption = ({ level, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex items-center justify-center px-4 py-4 mb-4 rounded-lg"
    style={{
      width: width - scale(40),
      backgroundColor: isSelected ? '#D66366' : 'white',
    }}>
    <Text
      className="text-lg"
      style={{
        color: isSelected ? 'white' : 'black',
      }}>
      {level.label}
    </Text>
    <Text className="text-2xl">{level.emoji}</Text>
  </TouchableOpacity>
);

const PickExperience = () => {
  const [experience, setExperience] = useState(null);
  const dispatch = useDispatch();

  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'experience' });
    uploadEvents();
  }, [logEvent, uploadEvents]);

  const selectExperience = useCallback(
    pickedExperience => {
      logEvent(AMPLITUDE_EVENTS.ONBOARDING_FINISH);
      uploadEvents();

      setExperience(pickedExperience);
      dispatch(
        chooseExperience({ experience: pickedExperience || 'Beginner' }),
      );
    },
    [dispatch, logEvent, uploadEvents],
  );

  const experienceLevels = [
    { key: 'Beginner', label: 'אמממ... מה זה מדיטציה?', emoji: '🤔' },
    { key: 'Intermediate', label: 'פה ושם, אבל לא באופן קבוע', emoji: '🤷‍♂️' },
    { key: 'Master', label: 'הרבה, אני ממש זן מאסטר!', emoji: '🧘‍♂️' },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PageTitle
        title="כמה נסיון יש לך בעולם המיינדפולנס?"
        subTitle={'הבחירה כאן תאפשר לך לקבל תוכן מותאם לרמה שלך'}
      />
      <View className="relative items-center mt-4">
        <Image
          style={{
            position: 'absolute',
            resizeMode: 'contain',
            top: -scale(110),
            width,
            height: scale(110),
            zIndex: 1,
          }}
          source={image('plants_bg')}
        />
        <View className="w-full flex-col items-center justify-center">
          {experienceLevels.map(level => (
            <ExperienceOption
              key={level.key}
              level={level}
              isSelected={experience === level.key}
              onPress={() => selectExperience(level.key)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PickExperience;
