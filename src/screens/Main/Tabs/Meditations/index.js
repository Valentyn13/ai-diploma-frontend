import CategoryMeditations from '@common/components/CategoryMeditations';
import { StyledSafeAreaView } from '@common/components/Styled';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';

const Meditations = () => {
  const categories = useSelector(categoriesSelector);
  categories.sort((a, b) => a.order - b.order);
  return (
    <StyledSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <CategoryMeditations
            key={category.id}
            category={category}
            meditations={category.meditations}
          />
        ))}
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default Meditations;
