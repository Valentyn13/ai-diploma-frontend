import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

const ShowAll: FC<PressableProps> = props => (
  <Pressable className="p-2" {...props}>
    <Text className="text-[13px] leading-4 text-neutral-700">
      {i18n.t('showAll')}
    </Text>
  </Pressable>
);

export default ShowAll;
