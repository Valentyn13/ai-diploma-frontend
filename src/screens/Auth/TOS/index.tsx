import AppText from '@common/components/AppText';
import { CircleButton } from '@common/components/buttons/CircleButton';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import { privacyText } from './privacy';
import { tosText } from './tos';

interface PrivacyPolicyProps {
  navigation: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  return (
    <ScrollView
      className="flex-1 bg-[#fdedd6]"
      contentContainerStyle={{ padding: scale(12) }}>
      <CircleButton
        size={40}
        icon="chevron-down"
        onPress={navigation.goBack}
        backgroundColor="#00000060"
        color="#fff"
      />
      <View className="mt-6 px-2 items-start">
        <AppText className="font-bold text-lg text-black">
          מדיניות פרטיות
        </AppText>
        <AppText className="text-left text-sm text-black">
          {privacyText}
        </AppText>
        <AppText className="font-bold text-lg text-black">תנאי שימוש</AppText>
        <AppText className="text-left text-sm text-black">{tosText}</AppText>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
