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
import Icon from 'react-native-vector-icons/Feather';

import MeditationItem from './MeditationItem';

const Header: FC<{ title: string }> = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={goBack}>
        <Icon name="chevron-left" size={30} color={theme.colors.textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.bgColor, // Set the background color for the header
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

interface Category {
  id: string;
  title: string;
  info?: string | null;
  height?: string;
  meditations: any[];
  order: number;
}

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
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.container}
      data={meditations}
      keyExtractor={item => item.id}
      renderItem={renderMeditationItem}
      numColumns={2} // Set the number of columns to 2
      ListHeaderComponent={() => <Header title={title} />}
      stickyHeaderIndices={[0]} // Make the header sticky
      showsVerticalScrollIndicator={false}
    />
  );
};

export default GroupedMeditations;
