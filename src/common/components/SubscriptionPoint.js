import { SubTitle } from '@common/components/Styled';
import React from 'react';
import { Image, View } from 'react-native';
import { scale } from 'react-native-size-matters';

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
      {showIcon && (
        <View>
          <Image
            source={require('../assets/images/Vmark.png')}
            style={{ width: scale(22), height: scale(22) }}
          />
        </View>
      )}
      <View
        style={{
          borderColor: 'red',
          flex: 1,
          paddingVertical: 2,
          paddingLeft: 8,
        }}>
        <SubTitle
          style={{
            color: 'white',
            alignSelf: 'flex-start',
            textAlign: 'left',
            fontSize: scale(16),
            lineHeight: scale(18),
          }}
          numberOfLines={2}
          k={text}
        />
      </View>
    </View>
  );
};

export default SubscriptionPoint;
