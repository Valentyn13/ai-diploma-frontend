/* eslint-disable react-native/no-inline-styles */
import theme from '@common/theme';
import colors from '@common/theme/colors';
import i18n from '@services/localization/i18n';
import React from 'react';
import { StatusBar, Text, View } from 'react-native';

const Header = () => {
  return (
    <>
      <View
        style={{
          height: 30,
          width: '100%',
          backgroundColor: colors.bgColor,
          borderBottomColor: 'transparent',
        }}>
        <StatusBar
          animated
          backgroundColor="#fdedd6"
          barStyle="dark-content"
          hidden={false}
        />
        <Text
          style={{
            fontFamily: theme.fonts.regular,
            color: theme.colors.textColor,
            fontSize: 17,
            textAlign: 'center',
            letterSpacing: 5.19,
          }}>
          {i18n.t('appName')}
        </Text>
      </View>
    </>
  );
};

export default Header;
