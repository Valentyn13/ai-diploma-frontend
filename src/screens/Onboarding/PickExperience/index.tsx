import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Title } from '@common/components/Styled';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import { ProgressView } from '@react-native-community/progress-view';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { chooseExperience } from 'store/actions';
import styled from 'styled-components';

const EXPERIENCE = [
  {
    key: 'Beginner',
    intro: 'expBeginner',
  },
  {
    key: 'Intermediate',
    intro: 'expIntermediate',
  },
  {
    key: 'Expert',
    intro: 'expExpert',
    shiftBase: true,
  },
];

const NUM_OF_ITEMS_IN_ROW = 3;

const CategorySelectorContainer = styled.TouchableOpacity`
  background-color: ${({ theme: { colors }, highlight }) =>
    highlight ? colors.selectedCategoryColor : colors.itemBgColor};
  width: ${({ theme: { dimens } }) =>
    (dimens.winWidth - dimens.margin * 4) / NUM_OF_ITEMS_IN_ROW}px;
  height: ${({ theme: { dimens } }) =>
    (dimens.winWidth - dimens.margin * 4) / NUM_OF_ITEMS_IN_ROW}px;
  padding: 8px;
  ${({ shiftBase }) => shiftBase && 'justify-content: flex-end;'}
`;

const CategorySelector = ({ idx, setExperience, isSelected }) => {
  const { key, intro, shiftBase } = EXPERIENCE[idx];

  return (
    <CategorySelectorContainer
      onPress={() => setExperience(key)}
      highlight={isSelected(key)}
      shiftBase={!!shiftBase}>
      <Title k={intro} />
    </CategorySelectorContainer>
  );
};

const PickExperience = ({ navigation: { navigate } }) => {
  const [experience, setExperience] = useState(null);
  const dispatch = useDispatch();

  const { width } = Dimensions.get('screen');
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'experience' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onContinue = useCallback(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_FINISH);
    uploadEvents();

    dispatch(chooseExperience({ experience: experience || 'Beginner' }));
    navigate('Onboarding', { screen: 'CategoriesSelector' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, experience, navigate]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{ position: 'absolute', top: 0, width }}
        source={image('gender_bg')}
      />
      <View
        style={{ position: 'absolute', top: scale(60), alignItems: 'center' }}>
        <WithSlideInX delay={300}>
          <WithFadeIn delay={300}>
            <AppText
              black
              style={{ fontSize: 20, textAlign: 'center', color: '#000' }}>
              כמה נסיון יש לך בעולם המיינדפולנס?
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 6,
                textAlign: 'center',
                color: '#000',
              }}>
              {
                'הבחירה כאן תאפשר לך לקבל תוכן מותאם לרמה שלך,\nבכל מקרה, אפשר לשנות את הבחירה גם בהמשך\nמתוך תפריט האפליקציה.'
              }
            </AppText>
          </WithFadeIn>
        </WithSlideInX>
      </View>
      <View style={{ alignItems: 'center', width: '90%' }}>
        <Image
          style={{
            position: 'absolute',
            resizeMode: 'contain',
            top: 0,
            width,
            height: scale(110),
            zIndex: 1,
          }}
          source={image('plants_bg')}
        />
        <WithSlideInY delay={600}>
          <WithFadeIn delay={600}>
            <TouchableOpacity
              onPress={() => setExperience('Beginner')}
              style={{
                alignItems: 'center',
                width: width - scale(40),
                marginTop: scale(80),
                paddingVertical: 36,
                paddingHorizontal: 20,
                backgroundColor:
                  experience === 'Beginner' ? '#D66366' : 'white',
                borderRadius: 8,
              }}>
              <AppText
                style={{
                  color: experience === 'Beginner' ? 'white' : '#D66366',
                  fontSize: 20,
                }}>
                אמממ... מה זה מדיטציה?
              </AppText>
            </TouchableOpacity>
          </WithFadeIn>
        </WithSlideInY>
        <WithSlideInY delay={700}>
          <WithFadeIn delay={700}>
            <TouchableOpacity
              onPress={() => setExperience('Intermediate')}
              style={{
                alignItems: 'center',
                width: width - scale(40),
                marginTop: scale(12),
                paddingVertical: 36,
                paddingHorizontal: 20,
                backgroundColor:
                  experience === 'Intermediate' ? '#D66366' : 'white',
                borderRadius: 8,
              }}>
              <AppText
                style={{
                  color: experience === 'Intermediate' ? 'white' : '#D66366',
                  fontSize: 20,
                }}>
                פה ושם, אבל לא באופן קבוע
              </AppText>
            </TouchableOpacity>
          </WithFadeIn>
        </WithSlideInY>
        <WithSlideInY delay={800}>
          <WithFadeIn delay={800}>
            <TouchableOpacity
              onPress={() => setExperience('Master')}
              style={{
                alignItems: 'center',
                width: width - scale(40),
                marginTop: scale(12),
                paddingVertical: 36,
                paddingHorizontal: 20,
                backgroundColor: experience === 'Master' ? '#D66366' : 'white',
                borderRadius: 8,
              }}>
              <AppText
                style={{
                  color: experience === 'Master' ? 'white' : '#D66366',
                  fontSize: 20,
                }}>
                הרבה, אני ממש זן מאסטר!
              </AppText>
            </TouchableOpacity>
          </WithFadeIn>
        </WithSlideInY>
      </View>
      <View
        style={{
          width: '80%',
          bottom: scale(100),
          position: 'absolute',
          height: 20,
          transform: [{ rotateY: Platform.OS === 'ios' ? '0deg' : '180deg' }],
        }}>
        <ProgressView
          progressViewStyle="default"
          progressTintColor="black"
          trackTintColor="gray"
          progress={0.5}
        />
      </View>
      <View
        className="w-full"
        style={{ position: 'absolute', bottom: 0, padding: scale(40) }}>
        <AppButton onPress={onContinue}>המשך</AppButton>
      </View>
    </View>
  );
};

CategorySelector.propTypes = {
  idx: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  setExperience: PropTypes.func.isRequired,
};

export default PickExperience;
