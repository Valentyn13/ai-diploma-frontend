import theme, { colors } from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import SessionsGrid from './SessionsGrid';

const Header: FC<{ title: string }> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack} className="absolute left-2 z-10">
        <Icon name="chevron-right" size={30} color={theme.colors.textColor} />
      </TouchableOpacity>
      <Text className="self-center" style={styles.headerText}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.bgColor,
  },
  headerText: {
    flex: 1,
    fontFamily: theme.fonts?.regular,
    color: theme.colors.textColor,
    fontSize: 17,
    textAlign: 'center',
    letterSpacing: 5.19,
  },
});

const MAX_MEDITATIONS = 40;

const GroupedMeditations = () => {
  const route = useRoute();
  const { title, meditations } = route.params || { title: '', meditations: [] };

  return (
    <SafeAreaView
      edges={['top', 'right', 'left']}
      className="bg-[#fdedd6] flex-1">
      <View className="px-5">
        <SessionsGrid
          meditations={meditations.slice(0, MAX_MEDITATIONS)}
          title={title}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupedMeditations;
