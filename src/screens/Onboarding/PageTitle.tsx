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
    <View className="absolute top-5 px-4">
      <Text
        style={{
          fontFamily: theme.fonts?.light,
        }}
        className="text-center text-2xl font-bold text-black">
        {title}
      </Text>
      <Text className="text-center font-normal text-black mt-2">
        {subTitle}
      </Text>
    </View>
  </>
);

export default PageTitle;
