import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Icon } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { EMAIL_ERROR_MESSAGE } from '@common/constants';
import alert from '@utils/alert';
import validateEmail from '@utils/validateEmail';
import React, { useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';

const RequestReset = ({ onSendCode, navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      alert(EMAIL_ERROR_MESSAGE);
      return;
    }

    setLoading(true);
    try {
      await onSendCode(email);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 pb-[30px] bg-primary-bg relative">
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
          איפוס סיסמא
        </AppText>
        <View className="bg-white py-4 px-2 rounded mt-24 flex-row items-center w-full">
          <Icon name="email" size={scale(20)} color="#000" />
          <TextInput
            onChangeText={setEmail}
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="done"
            placeholder="הזינו כתובת אימייל"
            className="w-5/6 mx-5 text-2xl text-right text-black"
          />
        </View>
      </KeyboardAwareScrollView>
      <View className="w-10/12 mx-auto">
        <AppButton loading={loading} onPress={handleSendCode}>
          שלחו לי קוד איפוס
        </AppButton>
      </View>
    </SafeAreaView>
  );
};

export default RequestReset;
