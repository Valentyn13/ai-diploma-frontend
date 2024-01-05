import { colors } from '@common/theme';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMeditation, removeFavoriteMeditation } from 'store/actions';

import { TouchableIcon } from './Styled';

interface FavoriteButtonProps {
  id: string;
  isDark?: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({ id, isDark = false }) => {
  const dispatch = useDispatch();

  const favoriteMeditations = useSelector(
    state => state.userPreferences.favoriteMeditations,
  );
  const isFavorite = favoriteMeditations[id] === true;

  const toggleFavorite = useCallback(() => {
    const action = isFavorite
      ? removeFavoriteMeditation
      : addFavoriteMeditation;
    dispatch(action({ meditationId: id }));
  }, [dispatch, id, isFavorite]);

  return (
    <TouchableIcon
      name={isFavorite ? 'heartSelected' : 'heart'}
      color={isDark ? colors.textColor : colors.whiteColor}
      onPress={toggleFavorite}
    />
  );
};

export default FavoriteButton;
