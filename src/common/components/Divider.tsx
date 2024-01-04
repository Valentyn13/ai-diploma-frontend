import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const Divider: FC<ViewProps> = ({ className, ...props }) => (
  <View
    {...props}
    className={`h-[1px] w-11/12 m-auto bg-[#513F73] opacity-20 ${className}`}
  />
);

export default Divider;
