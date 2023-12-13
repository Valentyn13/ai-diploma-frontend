/* eslint-disable react-native/no-inline-styles */
import AppButton from 'common/components/AppButton';
import { Title } from 'common/components/Styled';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dimensions, Modal, View } from 'react-native';
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

const AutoPlayer = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { width } = Dimensions.get('screen');
  return (
    <Modal visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fdedd6',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AppButton onPress={() => setIsVisible(false)}>המשך</AppButton>
      </View>
    </Modal>
  );
};

CategorySelector.propTypes = {
  idx: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  setExperience: PropTypes.func.isRequired,
};

export default AutoPlayer;
