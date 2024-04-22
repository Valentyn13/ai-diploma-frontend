import React from 'react';
import { Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';

const SubscriptionPoint = ({ text }: { text: string }) => (
  <View
    className="w-10/12"
    style={{
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'flex-start',
    }}>
    <Icon
      style={{
        marginTop: 6,
      }}
      name="check-circle"
      size={scale(16)}
      color="white"
    />
    <View
      style={{
        flex: 1,
        paddingVertical: 2,
        paddingLeft: 8,
      }}>
      <Text
        style={{
          fontSize: scale(14),
          lineHeight: scale(24),
        }}
        className="text-white text-left">
        {text}
      </Text>
    </View>
  </View>
);

export default SubscriptionPoint;
