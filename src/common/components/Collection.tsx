import HorizontalList from '@common/components/HorizontalList';
import { SubTitle } from '@common/components/Styled';
import i18n from '@services/localization/i18n';
import { shuffleArray } from '@utils/rand';
import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const ListTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
`;

interface Props {
  items: any[];
  onShowAll: () => void;
  title: string;
  limit?: number;
}

const Collection: FC<Props> = ({ items, onShowAll, title, limit = 5 }) => (
  <View>
    <View className="flex flex-row items-end justify-between w-full pl-2 mb-1">
      <ListTitle t={title} />
      {items.length > limit && (
        <TouchableOpacity onPress={() => onShowAll()} className="p-2">
          <Text className="text-xs text-neutral-800">{i18n.t('showAll')}</Text>
        </TouchableOpacity>
      )}
    </View>
    {items.length === 0 && (
      <View className="flex flex-row items-center justify-center w-full h-32">
        <Text className="text-neutral-500">{i18n.t('noSessions')}</Text>
      </View>
    )}
    <HorizontalList data={shuffleArray(items).slice(0, limit)} />
  </View>
);

export default Collection;
