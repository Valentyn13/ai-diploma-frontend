import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface AppButtonProps extends TouchableOpacityProps {
  style?: object;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
  loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  ellipsizeMode = 'tail',
  numberOfLines = 0,
  className,
  style,
  loading = false,
  ...props
}) => {
  let font = 'Rubik';

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
          style={[
            {
              fontFamily: font,
              color: 'white',
              fontSize: 20,
            },
            style,
          ]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
