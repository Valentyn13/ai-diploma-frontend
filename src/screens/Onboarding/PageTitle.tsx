import theme from '@common/theme';
import Wobble from '@screens/Onboarding/Wobble';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

const PageTitle: FC<{
  title: string;
  subTitle: string;
}> = ({ title, subTitle }) => (
  <>
    <Wobble seed={title} />
    <View className="absolute top-6 px-4">
      <Text
        style={{
          fontFamily: theme.fonts.bold,
        }}
        className="text-center text-2xl font-bold text-black">
        {title}
      </Text>
      <Text className="text-center text-md font-normal text-black mt-3">
        {subTitle}
      </Text>
    </View>
  </>
);

export default PageTitle;
