/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Title } from '@common/components/Styled';
import { ProgressView } from '@react-native-community/progress-view';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
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

const PickExperience = () => {
  const { navigate } = useNavigation();
  const [experience, setExperience] = useState(null);
  const dispatch = useDispatch();

  const onContinue = useCallback(() => {
    if (!experience) {
      return;
    }
    dispatch(chooseExperience({ experience }));
    navigate('CategoriesSelector');
  }, [dispatch, experience, navigate]);

  const { width } = Dimensions.get('screen');
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
        style={{ position: 'absolute', top: scale(80), alignItems: 'center' }}>
        <AppText black style={{ fontSize: 20, textAlign: 'center' }}>
          כמה נסיון יש לך בעולם המיינדפולנס?
        </AppText>
        <AppText style={{ fontSize: 16, marginTop: 6, textAlign: 'center' }}>
          {
            'הבחירה כאן תאפשר לך לקבל תוכן מותאם לרמה שלך,\nבכל מקרה, אפשר לשנות את הבחירה גם בהמשך\nמתוך תפריט האפליקציה.'
          }
        </AppText>
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
        <TouchableOpacity
          onPress={() => setExperience('Beginner')}
          style={{
            alignItems: 'center',
            width: '100%',
            marginTop: scale(80),
            paddingVertical: 36,
            paddingHorizontal: 20,
            backgroundColor: experience === 'Beginner' ? '#D66366' : 'white',
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
        <TouchableOpacity
          onPress={() => setExperience('Intermediate')}
          style={{
            alignItems: 'center',
            width: '100%',
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
        <TouchableOpacity
          onPress={() => setExperience('Master')}
          style={{
            alignItems: 'center',
            width: '100%',
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
      <View style={{ position: 'absolute', bottom: scale(40) }}>
        <AppButton onPress={() => onContinue()}>המשך</AppButton>
      </View>
    </View>
  );

  // const isSelected = useCallback(key => key === experience, [experience]);
  //
  // return (
  //   <Screen>
  //     <Container>
  //       <Icon name="logo" size={100} />
  //     </Container>
  //     <Container flex={1.2}>
  //       <CategorySelectorTitle k="meditation_title" />
  //       <CategoriesSelectorRow zIndex={1}>
  //         {EXPERIENCE.map(({key, intro, shiftBase}) => (
  //           <IconContainer key={intro} onPress={() => setExperience(key)}>
  //             <ExpImage source={image(intro)} shiftBase={!!shiftBase} />
  //           </IconContainer>
  //         ))}
  //       </CategoriesSelectorRow>
  //       <CategoriesSelectorRow>
  //         <CategorySelector idx={0} {...{setExperience, isSelected}} />
  //         <CategorySelector idx={1} {...{setExperience, isSelected}} />
  //         <CategorySelector idx={2} {...{setExperience, isSelected}} />
  //       </CategoriesSelectorRow>
  //       <CategorySelectionInfo k="categorySelectionInfo" />
  //     </Container>
  //     <ButtonsContainer>
  //       <Button title="continue" big onPress={onContinue} />
  //     </ButtonsContainer>
  //   </Screen>
  // );
};

CategorySelector.propTypes = {
  idx: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  setExperience: PropTypes.func.isRequired,
};

export default PickExperience;
