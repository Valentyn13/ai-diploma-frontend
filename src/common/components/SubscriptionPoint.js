import i18n from '@services/localization/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

const SubscriptionPoint = ({ text, showIcon = false }) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        marginTop: scale(12),
        flexDirection: 'row',
        width: showIcon ? '80%' : '90%',
        alignItems: 'center',
      }}>
      {showIcon && <Icon name="check-circle" size={scale(16)} color="white" />}
      <View
        style={{
          flex: 1,
          paddingVertical: 2,
          paddingLeft: 8,
        }}>
        <Text className="text-white text-left text-xl leading-6">
          {i18n.t(text)}
        </Text>
      </View>
    </View>
  );
};

export default SubscriptionPoint;
