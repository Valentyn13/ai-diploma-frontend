import { BoldSubTitle, SmallText } from '@common/components/Styled';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';

const ITEM_WIDTH = Math.round(theme.dimens.winWidth * 0.85);

const ArticleContainer = styled.TouchableOpacity`
  width: ${ITEM_WIDTH - 10}px;
  height: ${Platform.OS === 'android' ? 80 : 50}px;
  margin: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const Thumbnail = styled.Image.attrs({
  resizeMethod: 'auto',
  resizeMode: 'cover',
})`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const Title = styled(BoldSubTitle)`
  margin-bottom: 3px;
`;

const Article = ({ item }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('WebView', { uri: item.url, title: item.title });
  };

  return (
    <ArticleContainer onPress={onPress}>
      <Thumbnail source={{ uri: item.thumbnail }} />
      <TextContainer>
        <Title t={item.title} />
        <SmallText t={item.description} />
      </TextContainer>
    </ArticleContainer>
  );
};

Article.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

Article.ITEM_WIDTH = () => ITEM_WIDTH;

export default Article;
