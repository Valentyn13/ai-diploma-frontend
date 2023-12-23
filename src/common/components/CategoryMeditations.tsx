import HorizontalList from '@common/components/HorizontalList';
import { DashedSeparator, Title, TopTitle } from '@common/components/Styled';
import { colors, dimens } from '@common/theme';
import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Category {
  title: string;
  info?: string | null;
  height?: string;
  meditations: Record<string, unknown>[];
}

interface Props {
  category: Category;
  onShowAll?: () => void;
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
  onShowAll = () => {},
}) => (
  <View style={styles.categoryMeditationsContainer}>
    <View className="flex flex-row items-end justify-between w-full px-2">
      <TopTitle className="" style={styles.categoryTitle} t={title} />
      <TouchableOpacity onPress={onShowAll}>
        <Text className="text-xs text-neutral-800">{i18n.t('showAll')}</Text>
      </TouchableOpacity>
    </View>
    {!!info && <Title style={styles.info} t={info} />}
    <HorizontalList data={meditations.slice(0, 4)} height={height} />
    <DashedSeparator style={styles.separator} />
  </View>
);

export default CategoryMeditations;
