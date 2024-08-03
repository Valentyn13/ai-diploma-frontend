import { useNavigation } from '@react-navigation/native';
import {
  addFavoriteMeditation,
  removeFavoriteMeditation,
} from '@store/actions';
import { favoriteMeditationsSelector } from '@store/selectors';
import captureMessage from '@utils/captureMessage';
import React, { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Session } from 'types/Meditation';

import CourseRowItem from './CourseRowItem';

interface CourseMeditationsProps {
  items: Session[];
  isCategoryLocked: boolean;
  hasPremium: boolean;
  history: string[];
}

interface RenderItemProps extends ListRenderItemInfo<Session> {}

const CourseMeditations: FC<CourseMeditationsProps> = ({
  history,
  items,
  isCategoryLocked,
  hasPremium,
}) => {
  const { navigate } = useNavigation();
  const favoriteSessions = useSelector(
    favoriteMeditationsSelector,
  ) as Session[];
  const dispatch = useDispatch();

  const onPress = useCallback(
    (item: Session) => {
      if (!hasPremium && isCategoryLocked) {
        navigate('Subscribe');
      } else {
        navigate('MeditationPlayer', { item });
      }
    },
    [hasPremium, isCategoryLocked, navigate],
  );

  const onFavoritePress = useCallback(
    (id: string) => {
      const isFavorite = favoriteSessions.map(item => item.id).includes(id);
      const action = isFavorite
        ? removeFavoriteMeditation
        : addFavoriteMeditation;
      dispatch(action({ meditationId: id }));
    },
    [dispatch, favoriteSessions],
  );

  const renderItem = (props: RenderItemProps) => {
    const { item, index } = props;

    return (
      <CourseRowItem
        isListened={history.includes(item.id)}
        item={item}
        onPress={() => onPress(item)}
        isFavorite={favoriteSessions.map(({ id }) => id).includes(item.id)}
        onFavoritePress={() => onFavoritePress(item.id)}
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
      keyExtractor={({ id }: Session) => id}
      onScrollToIndexFailed={info => {
        captureMessage(
          `scrollToIndex failed in CourseMeditation. index=${info.index}`,
        );
      }}
    />
  );
};

export default CourseMeditations;
