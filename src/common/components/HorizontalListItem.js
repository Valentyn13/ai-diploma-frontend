/* eslint-disable react-native/no-inline-styles */
import { categoryImage } from '@common/assets/images';
import theme from '@common/theme';
import { useAmplitude } from '@services/hooks/useAmplitude';
import usePurchases from '@services/hooks/usePurchases';
import { logEvent } from '@utils/analytics';
import meditationTime from '@utils/meditationTime';
import PropTypes from 'deprecated-react-native-prop-types';
import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useSelector } from 'react-redux';
import { meditationInstructor } from 'store/selectors';
import styled from 'styled-components';

import { BoldSubTitle, CenteredView, Icon, SubTitle } from './Styled';

// TODO: notice big has no effect, consider to remove it
export const ITEM_WIDTH = big => theme.dimens.winWidth / (big ? 2.4 : 2.4);

export const ITEM_HEIGHT = height =>
  height === 'small' ? 120 : height === 'large' ? 280 : 160;

const Item = styled.TouchableOpacity`
  flex-direction: column;
  width: ${({ big }) => ITEM_WIDTH(big)};
  height: ${({ height }) => ITEM_HEIGHT(height)};
  margin: 5px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImageContainer = styled.ImageBackground.attrs(() => ({
  resizeMode: 'cover',
}))`
  flex: 1;
  background-color: green;
  justify-content: center;
`;

const IconsContainer = styled.View`
  height: 50px;
  background-color: ${({ theme: { colors } }) => colors.darkColor};
  flex-direction: column;
  align-items: flex-start;
  padding-left: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const IconWrapper = styled(CenteredView)``;

const IconWrapperContainer = styled(CenteredView)`
  flex-direction: row;
  margin-top: 5px;
  margin-right: 8px;
  align-items: center;
`;

const MeditationIconsContentWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TimeLabel = styled.View`
  flex-direction: row;
  position: absolute;
  top: ${({ height }) => (height === 'small' ? 10 : 20)}px;
  left: 0;
  height: 15px;
  padding: 0 6px 0 4px;
  background-color: ${({ theme: { colors } }) => colors.darkColor};
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const MeditationIconsContent = ({ categoryTitle, instructorName }) => {
  return (
    <MeditationIconsContentWrapper>
      <IconWrapperContainer>
        {/* <IconWrapper>
          <Icon color={'#fff'} name="meditationsOn" size={7} />
        </IconWrapper> */}
        <SubTitle style={{ marginLeft: 4 }} color="#fff" t={categoryTitle} />
      </IconWrapperContainer>
      <IconWrapperContainer>
        <IconWrapper>
          <Icon color="#fff" name="user" size={7} />
        </IconWrapper>
        <SubTitle
          style={{ marginLeft: 4 }}
          color="#fff"
          t={instructorName ?? ''}
        />
      </IconWrapperContainer>
    </MeditationIconsContentWrapper>
  );
};

const HorizontalListItem = ({
  item: {
    id,
    name,
    url,
    duration,
    categoryName,
    animation,
    thumbnail,
    isCategoryLocked,
    categoryTitle,
  },
  index,
  big,
  height,
}) => {
  const { navigate } = useNavigation();
  const amplitudeInstance = useAmplitude();
  const instructor = useSelector(state => meditationInstructor(state, id));

  const { hasPremium, setPurchaserIdentity } = usePurchases();

  React.useEffect(() => {
    setPurchaserIdentity();
  }, [setPurchaserIdentity]);

  const navigateToMeditation = useCallback(() => {
    if (!hasPremium && isCategoryLocked) {
      // console.log('!hasPremium && !isCategoryLocked', hasPremium, isCategoryLocked);
      navigate('Subscribe2', { item: { name } });
    } else {
      amplitudeInstance.logEvent('MEDITATION_CLICKED', { categoryName });
      amplitudeInstance.logEvent('MEDITATION_PLAY', { categoryName });
      logEvent('MEDITATION_CLICKED', { categoryName });
      logEvent('MEDITATION_PLAY', { categoryName });
      amplitudeInstance.uploadEvents();
      navigate('MeditationPlayer', {
        item: { id, name, categoryName, url, animation },
        index,
      });
    }
  }, [
    hasPremium,
    isCategoryLocked,
    navigate,
    name,
    amplitudeInstance,
    categoryName,
    id,
    url,
    animation,
    index,
  ]);

  const src = categoryImage(categoryName, index, thumbnail);

  return (
    <Item
      onPress={navigateToMeditation}
      {...{ big, height }}
      key={id.toString() + index.toString()}>
      <ImageContainer source={src}>
        {!hasPremium && isCategoryLocked && (
          <Image
            source={require('@common/assets/images/padlock.png')}
            style={{ width: 40, height: 40, opacity: 0.2, alignSelf: 'center' }}
          />
        )}
        <TimeLabel {...{ height }}>
          <IconWrapper>
            <Icon color="#fff" name="time" size={7} />
          </IconWrapper>
          <SubTitle
            style={{ marginLeft: 4 }}
            color="#fff"
            t={`${meditationTime(duration, true)}`}
          />
        </TimeLabel>
      </ImageContainer>
      <IconsContainer>
        <BoldSubTitle color="#fff" t={name} style={{ flex: 1 }} />
        {/* <BoldSubTitle color={'#fff'} t={instructor?.name} style={{marginLeft:15}}/>  */}

        <MeditationIconsContent
          {...{
            duration,
            locked: isCategoryLocked && !hasPremium,
            name,
            categoryTitle,
            height,
            instructorName: instructor?.name ?? '',
          }}
        />
      </IconsContainer>
    </Item>
  );
};

HorizontalListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string, // TODO: change to required
    duration: PropTypes.number, // TODO: change to required
    categoryName: PropTypes.string.isRequired,
    premium: PropTypes.bool,
    isCategoryLocked: PropTypes.bool.isRequired,
    categoryTitle: PropTypes.string.isRequired,
    animation: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  big: PropTypes.bool,
  height: PropTypes.string,
};

HorizontalListItem.defaultProps = {
  big: false,
  height: 'medium',
};

MeditationIconsContent.propTypes = {
  instructorName: PropTypes.string.isRequired,
  categoryTitle: PropTypes.string.isRequired,
};

HorizontalListItem.ITEM_WIDTH = ITEM_WIDTH;

export default HorizontalListItem;
