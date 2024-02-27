import image from '@common/assets/images';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useCache from '@services/hooks/useCache';
import { INTRO_METADATA_KEY, IntroMetadata } from '@services/hooks/useIntro';
import { chooseSex } from '@store/actions';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

import PageTitle from '../PageTitle';

const Gender = () => {
  const dispatch = useDispatch();
  const [sex, setSex] = useState<'M' | 'F'>();
  const [value, setValue] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const { width } = Dimensions.get('screen');
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'gender' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGender = (gender: 'M' | 'F') => {
    setSex(gender);
    dispatch(chooseSex({ sex: gender || 'M' }));
    setValue({
      ...value,
      sex,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PageTitle
        title="עוד רגע מתחילים"
        subTitle={'לפני הכניסה לאפליקציה,\nנשמח לדעת כיצד לפנות אלייך?'}
      />

      <View style={{ alignItems: 'center', width: '90%', marginBottom: 30 }}>
        <TouchableOpacity
          onPress={() => selectGender('F')}
          style={{
            alignItems: 'center',
            width: width - 40,
            paddingVertical: 36,
            paddingHorizontal: 20,
            backgroundColor: sex === 'F' ? '#D66366' : 'white',
            borderRadius: 12,
            height: 100,
          }}>
          <Text
            className="text-lg"
            style={{
              color: sex === 'F' ? 'white' : 'black',
            }}>
            נקבה ♀️
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectGender('M')}
          style={{
            alignItems: 'center',
            width: width - 40,
            marginTop: scale(15),
            paddingVertical: 36,
            paddingHorizontal: 20,
            backgroundColor: sex === 'M' ? '#D66366' : 'white',
            borderRadius: 12,
            height: 100,
          }}>
          <Text
            className="text-lg"
            style={{
              color: sex === 'M' ? 'white' : 'black',
            }}>
            זכר ♂️
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        className="absolute bottom-10 -left-1/4"
        source={image('plant')}
        resizeMethod="resize"
        resizeMode="contain"
      />
    </View>
  );
};

export default Gender;
