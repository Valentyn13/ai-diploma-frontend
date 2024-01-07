import image from '@common/assets/images';
import i18n from '@services/localization/i18n';
import PropTypes from 'prop-types';
import React from 'react';
import Dash from 'react-native-dash';
import styled from 'styled-components';

// Containers

export const SimpleContainer = styled.View`
  align-self: stretch;
  background-color: ${({ color }) => color || 'transparent'};
`;

export const CenteredView = styled.View`
  align-items: center;
  justify-content: center;
`;

export const TouchableCenteredView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

export const Container = styled(CenteredView)`
  flex: ${({ flex }) => flex || 1};
  align-self: stretch;
  background-color: #513f73;
`;

export const ContainerCourse = styled(CenteredView)`
  flex: ${({ flex }) => flex || 1};
  align-self: stretch;
  background-color: #fdedd6;
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  align-self: stretch;
`;

export const MeditationContainer = styled(CenteredView)`
  flex: ${({ flex }) => flex || 1};
  align-self: stretch;
`;

export const ScrolledContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const Screen = styled.View`
  flex: 1;
  padding-left: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-right: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-bottom: ${({ theme: { dimens } }) => dimens.margin}px;
  background-color: ${({ color }) => color || 'transparent'};
`;

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

// Text Elements

export const BaseText = styled.Text.attrs(({ k, t }) => ({
  children: t || i18n.t(k),
}))`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  color: ${({ theme: { colors }, color }) => color || colors.textColor};
  text-align: left;
`;

export const LightText = styled.Text.attrs(({ k, t }) => ({
  children: t || i18n.t(k),
}))`
  font-family: ${({ theme: { fonts } }) => fonts.light};
  color: ${({ theme: { colors }, color }) => color || colors.textColor};
  text-align: left;
`;

export const BigTitle = styled(BaseText)`
  font-size: 33px;
  letter-spacing: 1.38px;
`;

export const BoldTitle = styled(BaseText)`
  font-size: 23px;
  letter-spacing: 0.2px;
  font-family: ${({ theme: { fonts } }) => fonts.bold};
`;

export const TopTitle = styled(BaseText)`
  font-size: 19px;
  letter-spacing: 5.19px;
`;

export const Title = styled(BaseText)`
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.46px;
`;

export const SubTitle = styled(BaseText)`
  font-size: 10px;
  letter-spacing: 0.58px;
`;

export const BoldSubTitle = styled(BaseText)`
  font-size: 17px;
  letter-spacing: 0.58px;
  font-weight: bold;
`;

export const ListItemCaption = styled(TopTitle)`
  background-color: ${({ theme: { colors }, lightBg }) =>
    lightBg ? colors.whiteColor : colors.itemBgColor};
  align-self: flex-start;
  padding-top: 4px;
  padding-bottom: 2px;
  padding-right: 8px;
  padding-left: 8px;
`;

export const ButtonTitle = styled(BaseText)`
  font-size: 18px;
  font-family: ${({ theme: { fonts } }) => fonts.bold};
  letter-spacing: 0.16px;
  text-align: center;
  color: ${({ theme: { colors }, titleColor }) =>
    titleColor ? 'black' : colors.whiteColor};
`;

export const ButtonTitleSmall = styled(BaseText)`
  font-size: 14px;
  text-align: center;
  color: #fff;
  font-weight: 800;
`;

export const SmallText = styled(BaseText)`
  font-size: 14px;
  color: #000;
`;

// Input Field

export const InputField = styled.TextInput.attrs(({ label }) => ({
  placeholder: i18n.t(label),
  placeholderTextColor: 'black',
  textAlign: 'right',
}))`
  background-color: ${({ theme: { colors } }) => colors.itemBgColor};
  color: ${({ theme: { colors } }) => colors.textColor};
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: 16px;
  letter-spacing: 0.46px;
  align-self: stretch;
  height: 40px;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 20px;
`;

// Icon

export const Icon = styled.Image.attrs(({ name }) => ({
  resizeMode: 'contain',
  source: image(name),
}))`
  width: ${({ size }) => size || 30}px;
  height: ${({ size }) => size || 30}px;
  ${({ color }) =>
    color &&
    `
    tint-color: ${color};
  `}
`;

export const TouchableIcon = ({
  name,
  onPress,
  color,
  size = undefined,
  opacity = 1,
}) => (
  <TouchableCenteredView {...{ onPress }}>
    <Icon {...{ name, color, size, opacity }} />
  </TouchableCenteredView>
);

TouchableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

TouchableIcon.defaultProps = {
  size: undefined,
  color: undefined,
};

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme: { colors } }) => colors.textColor};
  align-self: stretch;
`;

export const DashedSeparator = styled(Dash).attrs(({ theme: { colors } }) => ({
  dashLength: 6,
  dashGap: 2,
  dashThickness: 1,
  dashColor: '#4b4b4b',
}))`
  height: 1px;
  align-self: stretch;
`;
