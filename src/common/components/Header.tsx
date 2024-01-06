import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const Header: FC<{ title?: string } & ViewProps> = ({
  title,
  className,
  ...props
}) => {
  const { goBack } = useNavigation();

  return (
    <View
      className={`relative flex-row items-center justify-center h-12 px-2.5 ${className}`}
      {...props}>
      <TouchableOpacity onPress={goBack} className="absolute left-2 z-10">
        <Icon name="chevron-right" size={30} color={theme.colors.textColor} />
      </TouchableOpacity>
      {title && (
        <Text
          className="flex-1 self-center text-center text-lg font-regular text-textColor tracking-widest"
          style={{ letterSpacing: 5.19 }}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default Header;
