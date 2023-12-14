import CategoryMeditations from '@common/components/CategoryMeditations';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';

const Meditations = () => {
  const categories = useSelector(categoriesSelector);
  categories.sort((a, b) => a.order - b.order);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {categories.map(category => (
        <CategoryMeditations
          key={category.id}
          category={category}
          meditations={category.meditations}
        />
      ))}
    </ScrollView>
  );
};

export default Meditations;
