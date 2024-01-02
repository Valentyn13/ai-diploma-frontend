import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import useLogin from '@services/hooks/useLogin';
import React, { FC, useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';
import IconFeather from 'react-native-vector-icons/Feather';

const ForgotPassword: FC = () => {
  const { forgotPassword } = useLogin();
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation();

  const onResetPassword = async () => {
    await forgotPassword(email);
  };

  return (
    <SafeAreaView className="flex flex-1 bg-[#fdedd6] relative">
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
      <View className="absolute bottom-10 flex items-center">
        <AppButton onPress={() => onResetPassword()}>אפס סיסמה</AppButton>
      </View>
      <TouchableOpacity
        className="absolute top-10 left-10"
        onPress={() => navigation.goBack()}>
        <IconFeather name="chevron-right" size={24} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;
