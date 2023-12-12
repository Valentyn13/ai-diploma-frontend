import PropTypes from 'deprecated-react-native-prop-types';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMeditation, removeFavoriteMeditation } from 'store/actions';
import { withTheme } from 'styled-components';

import { TouchableIcon } from './Styled';

const FavoriteIndicator = ({
  id,
  theme: {
    colors: { whiteColor, textColor },
  },
  dark,
}) => {
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
      color={dark ? textColor : whiteColor}
      onPress={toggleFavorite}
    />
  );
};

FavoriteIndicator.propTypes = {
  id: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      whiteColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dark: PropTypes.bool,
};

FavoriteIndicator.defaultProps = {
  dark: false,
};

export default withTheme(FavoriteIndicator);
