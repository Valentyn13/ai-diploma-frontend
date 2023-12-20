import { Container } from '@common/components/Styled';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  favoriteMeditationsSelector,
  practiceHistorySelector,
} from 'store/selectors';
import styled from 'styled-components';

import PracticeHistoryIconedItem from './PracticeHistoryIconedItem';
import PracticeHistoryListItem from './PracticeHistoryListItem';

const MeditationsHistoryContainer = styled(Container)`
  margin-top: 30px;
`;

const PracticeHistory = () => {
  const favMeditations = useSelector(favoriteMeditationsSelector);
  const history = useSelector(practiceHistorySelector);
  // console.log('favMeditations', favMeditations);

  // console.log('history', history);

  // {history &&
  //   history.map(item => (
  //     /* eslint-disable react/no-array-index-key */
  //     <PracticeHistoryListItem
  //       item={item}
  //       key={`${item.type}${item.timestamp}${item.id ? item.id : item.badge}}`}
  //     />
  //   ))}
  return (
    <MeditationsHistoryContainer>
      <PracticeHistoryIconedItem icon="heartSelected" />
      {favMeditations &&
        favMeditations.length > 0 &&
        favMeditations.map(item => (
          <PracticeHistoryListItem item={item} key={item?.id} />
        ))}
      <PracticeHistoryIconedItem icon="meditationsHistory" />

      {/* TODO: convert to FlatList */}
      {history &&
        history.length > 0 &&
        history.map(item => (
          // eslint-disable react/no-array-index-key
          <PracticeHistoryListItem
            item={item}
            key={`${item?.type}${item?.timestamp}${
              item?.id ? item.id : item?.badge
            }}`}
          />
        ))}
    </MeditationsHistoryContainer>
  );
};

export default PracticeHistory;
