import CategoryMeditations from '@common/components/CategoryMeditations';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';

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
  meditations: Record<string, unknown>[];
  order: number;
}

const Meditations = () => {
  const navigation = useNavigation();
  const categories = useSelector(categoriesSelector) as Category[];

  const onShowAll = (id: string) => {
    const category = categories.find(c => c.id === id);

    if (!category) {
      return;
    }

    navigation.navigate('Main', {
      screen: 'GroupedMeditations',
      params: { ...category },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {categories
        .sort((a, b) => a.order - b.order)
        .map(category => (
          <CategoryMeditations
            key={category.id}
            category={category}
            onShowAll={() => onShowAll(category.id)}
          />
        ))}
    </ScrollView>
  );
};

export default Meditations;
