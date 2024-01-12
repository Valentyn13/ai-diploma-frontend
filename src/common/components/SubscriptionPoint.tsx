import i18n from '@services/localization/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

const SubscriptionPoint = ({ text }: { text: string }) => (
  <View
    style={{
      alignSelf: 'center',
      flexDirection: 'row',
      width: '80%',
      alignItems: 'center',
    }}>
    <Icon name="check-circle" size={scale(16)} color="white" />
    <View
      style={{
        flex: 1,
        paddingVertical: 2,
        paddingLeft: 8,
      }}>
      <Text className="text-white text-left text-lg">{i18n.t(text)}</Text>
    </View>
  </View>
);

export default SubscriptionPoint;
