import BgSelector from '@common/components/buttons/BgSelector';
import { usePersonalized } from '@services/hooks/usePersonalized';
import { useUser } from '@services/hooks/useUser';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EXTRA_TOP_PADDING = Platform.OS === 'ios' ? 8 : 24;

const Personalized = () => {
  const { getTitle, getSubtitle } = usePersonalized();
  const insets = useSafeAreaInsets();
  const { user } = useUser();

  return (
    <View
      style={[
        styles.scrollView,
        { paddingTop: insets.top + EXTRA_TOP_PADDING },
      ]}>
      <View className="h-[96px] flex-row justify-between relative">
        <View className="p-4">
          <Text className="text-left text-[#0F1B48] font-semibold text-[27px] leading-[27px]">
            {getTitle()} {user.name ?? ''}
          </Text>
          <Text className="text-left text-[#666D89] font-semibold text-[15px]">
            {getSubtitle()}
          </Text>
        </View>
        <View className="mr-4 mt-2">
          <BgSelector />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    zIndex: 100,
    paddingTop: 20,
  },
  percentageText: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
  },
  scrollView: {
    zIndex: 100,
    flex: 1,
    height: 252,
    overflow: 'visible',
  },
  badgeScrollContainer: {
    flexDirection: 'row',
    paddingLeft: 4,
    paddingBottom: 16,
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 96,
  },
  title: {
    color: '#2F2F2F',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default Personalized;
