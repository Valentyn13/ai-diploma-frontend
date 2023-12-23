import theme, { colors } from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import MeditationItem from './MeditationItem';

const Header = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <>
      <View className="flex flex-row items-center justify-center h-16">
        <Text
          style={{
            flex: 1,
            fontFamily: theme.fonts!.regular,
            color: theme.colors.textColor,
            fontSize: 17,
            textAlign: 'center',
            letterSpacing: 5.19,
          }}>
          {title}
        </Text>
        <TouchableOpacity onPress={goBack}>
          <Icon name="chevron-left" size={30} color={theme.colors.textColor} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
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
      contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
      data={meditations}
      keyExtractor={item => item.id}
      renderItem={renderMeditationItem}
      numColumns={2} // Set the number of columns to 2
      ListHeaderComponent={() => <Header title={title} />}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default GroupedMeditations;
