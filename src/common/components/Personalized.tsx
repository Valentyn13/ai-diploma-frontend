import BgSelector from '@common/components/buttons/BgSelector';
import theme from '@common/theme';
import { usePersonalized } from '@services/hooks/usePersonalized';
import { useUser } from '@services/hooks/useUser';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Personalized = () => {
  const { getTitle, getSubtitle } = usePersonalized();

  const { user } = useUser();

  return (
    <View style={styles.scrollView}>
      <View className="h-[96px] flex-row justify-between items-center relative">
        <View className="p-4">
          <Text
            style={{
              fontFamily: theme.fonts.bold,
            }}
            className="text-left text-[#2F2F2F] font-medium text-[24px]">
            {getTitle()} {user.name ?? ''}
          </Text>
          <Text className="text-left text-[#4F4F4F] font-normal text-base">
            {getSubtitle()}
          </Text>
        </View>
        <View className="mr-4">
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
    height: 241,
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
