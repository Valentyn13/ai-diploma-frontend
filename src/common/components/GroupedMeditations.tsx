import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SessionsGrid from './SessionsGrid';

const Header: FC<{ title: string }> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <View className="relative flex flex-row items-start justify-center py-5 bg-[#fdedd6]">
      <View className="absolute left-0 top-5">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <Text
        className="text-3xl font-bold text-center text-black"
        style={{ fontFamily: theme.fonts!.regular }}>
        {title}
      </Text>
    </View>
  );
};

const MAX_MEDITATIONS = 40;

const GroupedMeditations = () => {
  const route = useRoute();
  const { title, meditations } = (route.params as any) || {
    title: '',
    meditations: [],
  };

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="bg-[#fdedd6] flex-1">
      <View className="px-5">
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}>
          {title && <Header title={title} />}
          <SessionsGrid
            meditations={meditations.slice(0, MAX_MEDITATIONS)}
            title={title}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GroupedMeditations;
