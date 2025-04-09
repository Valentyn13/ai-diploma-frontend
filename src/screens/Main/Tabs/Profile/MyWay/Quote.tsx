import React from 'react';
import { Text, View } from 'react-native';

const Quote = () => {
  return (
    <View>
      <Text className="mt-4 text-right text-lg italic font-medium text-black">
        - "Націоналізм... - рух світла і волі."
      </Text>
      <Text className="mt-4 text-right text-sm italic font-medium text-black">
        Микола Міхновський
      </Text>
    </View>
  );
};

export default Quote;
