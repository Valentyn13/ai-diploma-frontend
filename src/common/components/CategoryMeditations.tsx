import HorizontalList from '@common/components/HorizontalList';
import { DashedSeparator, Title, TopTitle } from '@common/components/Styled';
import { colors, dimens } from '@common/theme';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Category {
  title: string;
  info?: string | null;
  height?: string;
  meditations: Record<string, unknown>[];
}

interface Props {
  category: Category;
}

const styles = StyleSheet.create({
  categoryMeditationsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: colors.bgColor,
  },
  categoryTitle: {
    fontWeight: 'bold',
    marginLeft: 15,
  },
  info: {
    margin: 15,
  },
  separator: {
    marginTop: 15,
    marginBottom: dimens.margin,
  },
});

const CategoryMeditations: FC<Props> = ({
  category: { title, info, height, meditations },
}) => (
  <View style={styles.categoryMeditationsContainer}>
    <TopTitle style={styles.categoryTitle} t={title} />
    {!!info && <Title style={styles.info} t={info} />}
    <HorizontalList data={meditations} height={height} />
    <DashedSeparator style={styles.separator} />
  </View>
);

export default CategoryMeditations;
