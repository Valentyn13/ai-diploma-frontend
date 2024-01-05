import Collection from '@common/components/Collection';
import Divider from '@common/components/Divider';
import { Container } from '@common/components/Styled';
import i18n from '@services/localization/i18n';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  favoriteMeditationsSelector,
  practiceHistorySelector,
} from 'store/selectors';
import styled from 'styled-components';

const MeditationsHistoryContainer = styled(Container)`
  margin-top: 30px;
`;

const MyCollections = () => {
  const favMeditations = useSelector(favoriteMeditationsSelector);
  const history = useSelector(practiceHistorySelector);

  return (
    <View>
      <Collection
        title={i18n.t('favorites')}
        items={favMeditations}
        onShowAll={() => {
          // onShowAll(i18n.t.('latest_release'), favMeditations);
        }}
      />
      <Divider className="my-6" />

      <Collection
        title={i18n.t('history')}
        items={history}
        onShowAll={() => {
          // onShowAll(i18n.t.('latest_release'), favMeditations);
        }}
      />
    </View>
  );
};

export default MyCollections;
