import CategoryMeditations from '@common/components/CategoryMeditations';
import Header from '@common/components/Header';
import { colors } from '@common/theme';
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
  const categories = useSelector(categoriesSelector) as Category[];

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Header />
      {categories
        .sort((a, b) => a.order - b.order)
        .map(category => (
          <CategoryMeditations key={category.id} category={category} />
        ))}
    </ScrollView>
  );
};

export default Meditations;
