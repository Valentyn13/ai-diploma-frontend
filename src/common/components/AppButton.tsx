import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  style?: object;
  medium?: boolean;
  thin?: boolean;
  bold?: boolean;
  black?: boolean;
  light?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
  loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  medium,
  thin,
  bold,
  black,
  light,
  children,
  ellipsizeMode = 'tail',
  numberOfLines = 0,
  className,
  loading = false,
  ...props
}) => {
  let font = Platform.OS === 'ios' ? 'AlmoniDLAAA' : 'almoni-dl-aaa';
  if (bold) {
    font += '-bold';
  } else if (light) {
    font += '-light';
  } else if (black) {
    font += '-black';
  } else if (thin) {
    font += '-thin';
  } else if (medium) {
    font += '-medium';
  } else {
    font += '';
  }

  return (
    <TouchableOpacity
      disabled={loading}
      className={`flex items-center bg-[#273051] px-10 py-4 rounded-md w-full ${className}`}
      {...props}>
      {loading ? (
        <ActivityIndicator color="white" size="small" animating={true} />
      ) : (
        <Text
          ellipsizeMode={ellipsizeMode}
          numberOfLines={numberOfLines}
          allowFontScaling={false}
          style={{
            fontFamily: font,
            color: 'white',
            fontSize: 20,
          }}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
