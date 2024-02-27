import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

const Card: FC<PropsWithChildren> = ({ children }) => (
  <View className="rounded-lg p-4 bg-[#E7D9C8]/50">{children}</View>
);

export default Card;
