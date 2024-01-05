import Collection from '@common/components/Collection';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';
import { Category } from 'types/Category';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
  },
});

const Meditations = () => {
  const { navigate } = useNavigation();
  const categories = useSelector(categoriesSelector) as Category[];

  const onShowAll = (title: string, meditations: any[]) => {
    // @ts-ignore
    navigate('Main', {
      screen: 'GroupedMeditations',
      params: { title, meditations },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {categories
        .sort((a, b) => a.order - b.order)
        .map(category => (
          <Collection
            key={category.id}
            items={category.meditations}
            title={category.title}
            onShowAll={() => onShowAll(category.title, category.meditations)}
          />
        ))}
    </ScrollView>
  );
};

export default Meditations;
