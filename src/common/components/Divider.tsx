import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const Divider: FC<ViewProps> = ({ className, ...props }) => (
  <View className="w-full pt-6 pb-4 px-5">
    <View {...props} className="h-[1px] w-full bg-[#513F73] opacity-10" />
  </View>
);

export default Divider;
