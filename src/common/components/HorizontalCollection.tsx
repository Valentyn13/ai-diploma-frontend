import HorizontalList from '@common/components/HorizontalList';
import { SubTitle } from '@common/components/Styled';
import i18n from '@services/localization/i18n';
import { shuffleArray } from '@utils/rand';
import React, { ElementType, FC, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const ListTitle = styled(SubTitle)`
  font-size: 22px;
  font-weight: bold;
  align-self: flex-start;
  letter-spacing: 0.1px;
  color: #414141;
`;

interface Props {
  items: any[];
  onShowAll?: () => void;
  title: string;
  limit?: number;
  shuffle?: boolean;
  renderItem?: ElementType<{
    item: { id: string; name: string; colors: string[] };
  }>;
  prioritizeFree?: boolean;
}

const HorizontalCollection: FC<Props> = ({
  items,
  onShowAll = null,
  title,
  limit = 5,
  shuffle = true,
  renderItem,
  prioritizeFree = false,
}) => {
  const data = useMemo(() => {
    const uniqueIds = [...new Set(items.filter(Boolean).map(item => item.id))];
    let orderedItems = uniqueIds.map(id => items.find(item => item.id === id));

    if (shuffle) {
      orderedItems = shuffleArray(orderedItems);
    }

    if (prioritizeFree) {
      orderedItems = items.sort((a, b) => {
        if (a.isCategoryLocked && !b.isCategoryLocked) {
          return 1;
        }
        if (!a.isCategoryLocked && b.isCategoryLocked) {
          return -1;
        }
        return 0;
      });
    }

    return orderedItems.slice(0, limit);
  }, [items, limit, prioritizeFree, shuffle]);

  return (
    <View>
      <View className="flex flex-row items-center justify-between w-full mb-[20px] pl-5 pr-3">
        <ListTitle t={title} />
        {onShowAll && (
          <TouchableOpacity onPress={() => onShowAll()} className="p-2">
            <Text className="text-[14px] leading-4 text-[#16161691]">
              {i18n.t('showAll')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {items.length === 0 && (
        <View className="flex flex-row items-center justify-center w-full h-32">
          <Text className="text-neutral-500">{i18n.t('noSessions')}</Text>
        </View>
      )}
      <HorizontalList renderUsing={renderItem} data={data} />
    </View>
  );
};

export default HorizontalCollection;
