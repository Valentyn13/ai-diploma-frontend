import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  CONFIRM_PASSWORD_ERROR,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  RESET_CODE_ERROR_MESSAGE,
} from '@common/constants';
import alert from '@utils/alert';
import React, { FC, useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props {
  onSubmit: (newPassword: string, code: string) => Promise<void>;
  navigation: any;
}

const ResetPassword: FC<Props> = ({ onSubmit, navigation }) => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      if (!code.trim()) {
        // TODO: Add new message
        alert(RESET_CODE_ERROR_MESSAGE);
        setLoading(false);
        return;
      }
      if (newPassword.trim().length < 6) {
        //TODO: Add new message
        alert(PASSWORD_LENGTH_ERROR_MESSAGE);
        setLoading(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        alert(CONFIRM_PASSWORD_ERROR);
        setLoading(false);
        return;
      }

      await onSubmit(newPassword, code);

      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 bg-primary-bg relative">
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
        <AppText className="font-semibold text-2xl mt-16 text-center text-black">
          הזנת סיסמא חדשה
        </AppText>
        <View className="bg-white py-4 px-2 rounded mt-8 flex-row items-center w-full">
          <Icon size={scale(20)} color="#000" name="hashtag" />
          <TextInput
            onChangeText={setCode}
            placeholderTextColor="grey"
            keyboardType="default"
            returnKeyType="done"
            placeholder="קוד איפוס"
            className="w-5/6 mx-5 text-2xl text-right text-black"
          />
        </View>
        <View className="bg-white py-4 px-2 rounded mt-4 flex-row items-center w-full">
          <Icon name="lock" size={scale(20)} color="#000" />
          <TextInput
            onChangeText={setNewPassword}
            placeholderTextColor="grey"
            secureTextEntry
            returnKeyType="done"
            placeholder="סיסמא חדשה"
            className="w-5/6 mx-5 text-2xl text-right text-black"
          />
        </View>
        <View className="bg-white py-4 px-2 rounded mt-4 flex-row items-center w-full">
          <Icon name="lock" size={scale(20)} color="#000" />
          <TextInput
            onChangeText={setConfirmPassword}
            placeholderTextColor="grey"
            secureTextEntry
            returnKeyType="done"
            placeholder="אימות סיסמא חדשה"
            className="w-5/6 mx-5 text-2xl text-right text-black"
          />
        </View>
      </KeyboardAwareScrollView>
      <View className="w-10/12 mx-auto mt-8 pb-[30px]">
        <AppButton loading={loading} onPress={handleResetPassword}>
          שנה סיסמא
        </AppButton>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
