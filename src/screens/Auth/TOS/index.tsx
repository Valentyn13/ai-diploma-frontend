import AppText from '@common/components/AppText';
import { CircleButton } from '@common/components/buttons/CircleButton';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { privacyText } from './privacy';

interface PrivacyPolicyProps {
  navigation: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-primary-bg">
      <ScrollView
        className="flex-1 bg-primary-bg"
        contentContainerStyle={{ padding: scale(12) }}>
        <View className="flex-row justify-between items-center">
          <CircleButton
            size={40}
            icon="chevron-left"
            onPress={navigation.goBack}
            backgroundColor="#00000060"
            color="#fff"
          />
          <AppText className="font-semibold text-[22px] text-black">
            Політика конфіденційності
          </AppText>
        </View>

        <View className="mt-6 px-2 items-start">
          <AppText className="text-left text-sm text-black">
            {privacyText}
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
