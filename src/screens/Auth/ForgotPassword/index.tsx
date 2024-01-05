import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import useLogin from '@services/hooks/useLogin';
import React, { FC, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useLogin();
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation();

  const onResetPassword = async () => {
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex flex-1 bg-[#fdedd6] relative">
      <View className="left-4 top-4 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        className="flex"
        contentContainerStyle={{ flex: 1, padding: scale(24) }}>
        <AppText className="font-bold text-2xl mt-16 text-center text-black">
          איפוס סיסמה
        </AppText>
        <View className="bg-white py-4 px-2 rounded mt-24 flex-row items-center w-full">
          <Icon name="email" size={scale(20)} color="#000" />
          <TextInput
            onChangeText={setEmail}
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="done"
            placeholder="אימייל"
            className="w-5/6 mx-5 text-2xl text-right text-black"
          />
        </View>
      </KeyboardAwareScrollView>
      <View className="w-10/12 mx-auto">
        <AppButton loading={loading} onPress={onResetPassword}>
          אפסו סיסמה
        </AppButton>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
