import theme, { colors } from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import MeditationItem from './MeditationItem';

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

const GroupedMeditations = () => {
  const route = useRoute();
  const { title, meditations } = route.params || { title: '', meditations: [] };

  const renderMeditationItem = useCallback(
    ({ item, index }) => (
      <MeditationItem key={item.id} item={item} index={index} />
    ),
    [],
  );

  return (
    <SafeAreaView edges={['top', 'right', 'left']} className="bg-[#fdedd6]">
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        data={meditations}
        keyExtractor={item => item.id}
        renderItem={renderMeditationItem}
        numColumns={2}
        ListHeaderComponent={() => <Header title={title} />}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: theme.dimens.winWidth / 2 - 16,
          offset: 280 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

export default GroupedMeditations;
