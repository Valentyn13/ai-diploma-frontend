import { useNavigation } from '@react-navigation/native';
import captureMessage from '@utils/captureMessage';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Meditation } from 'types/Meditation';

import CourseRowItem from './CourseRowItem';

interface CourseMeditationsProps {
  items: Meditation[];
  isCategoryLocked: boolean;
  hasPremium: boolean;
  history: string[];
}

interface RenderItemProps extends ListRenderItemInfo<Meditation> {}

const CourseMeditations: FC<CourseMeditationsProps> = ({
  history,
  items,
  isCategoryLocked,
  hasPremium,
}) => {
  const { navigate } = useNavigation();

  const onPress = useCallback(
    (item: Meditation) => {
      if (!hasPremium && !isCategoryLocked) {
        navigate('Subscribe');
      } else {
        navigate('MeditationPlayer', { item });
      }
    },
    [hasPremium, isCategoryLocked, navigate],
  );

  const renderItem = (props: RenderItemProps) => {
    const { item, index } = props;

    return (
      <CourseRowItem
        isListened={history.includes(item.id)}
        item={item}
        onPress={() => onPress(item)}
        index={index}
      />
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={items}
      renderItem={renderItem}
      keyExtractor={({ id }: Meditation) => id}
      onScrollToIndexFailed={info => {
        captureMessage(
          `scrollToIndex failed in CourseMeditation. index=${info.index}`,
        );
      }}
    />
  );
};

export default CourseMeditations;
