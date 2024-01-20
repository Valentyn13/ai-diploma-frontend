import i18n from '@services/localization/i18n';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SubscriptionPoint = ({ text }: { text: string }) => (
  <View
    className="w-10/12"
    style={{
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <Icon name="check-circle" size={16} color="white" />
    <View
      style={{
        flex: 1,
        paddingVertical: 2,
        paddingLeft: 8,
      }}>
      <Text className="text-white text-left text-base">{i18n.t(text)}</Text>
    </View>
  </View>
);

export default SubscriptionPoint;
