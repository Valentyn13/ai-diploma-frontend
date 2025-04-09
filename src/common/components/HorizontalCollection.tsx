import HorizontalList, { Item } from '@common/components/HorizontalList';
import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

interface Props {
  items: Item[];
  title: string;
  limit?: number;
}

const HorizontalCollection: FC<Props> = ({ items = [], title }) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-between w-full mb-[10px] pl-5 pr-3">
        <Text className="font-medium text-[20px] text-left text-[#414141]">
          {title}
        </Text>
      </View>
      {items.length === 0 && (
        <View className="flex flex-row items-center justify-center w-full h-32">
          <Text className="text-neutral-500">{i18n.t('noSessions')}</Text>
        </View>
      )}
      <HorizontalList data={items} />
    </View>
  );
};

export default HorizontalCollection;
