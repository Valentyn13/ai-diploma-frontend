import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import Button from '@common/components/Button';
import { Title } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { PASSWORD_NOT_MATCH } from '@common/constants';
import theme from '@common/theme';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import { useUser } from '@services/hooks/useUser';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

const Label = styled(Title)`
  font-size: ${scale(18)}px;
  color: #333;
  min-width: ${scale(64)}px;
  line-height: ${scale(18)}px;
`;

interface RowProps {
  label: string;
  value: string;
  keyValue?: boolean;
}

const Row: React.FC<RowProps> = ({ label, value, keyValue }) => (
  <View className="flex flex-row items-center justify-start h-10">
    <Label k={label} />
    {keyValue ? <Label k={value} /> : <Label t={value} />}
  </View>
);

interface DetailsProps {}

const Details: FC<DetailsProps> = ({ navigation }) => {
  const {
    user: { name, email, sex, updateloader },
  } = useUser();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>('');
  const [newsex, setNewSex] = useState<string | undefined>();
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string | undefined>();

  const { updateProfile, changePassword } = useUpdateProfile();

  useEffect(() => {
    setNewName(name);
    setNewSex(sex);
  }, [name, sex]);

  const submit = () => {
    const newData = {
      sex: newsex,
      name: newName,
    };
    updateProfile(newData);
    setTimeout(() => {
      setToggleModal(false);
    }, 1000);
  };

  const submitChangePassword = () => {
    if (password === verifyPassword) {
      changePassword(password);
      setTimeout(() => {
        setPasswordModal(false);
      }, 1000);
    } else {
      Alert.alert(PASSWORD_NOT_MATCH);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-primary-bg">
      <View className=" -ml-2 flex-row justify-between items-center mb-12 -mt-4 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-left"
        />
        <Text className="text-xl text-black font-bold">
          {' '}
          Інформація про користувача
        </Text>
      </View>
      <View>
        <Row label="name" value={name} />
        <Row label="sex" value={sex === 'M' ? 'male' : 'female'} keyValue />
        <Row label="email" value={email} />
      </View>
      <View className="flex flex-1 items-center justify-center">
        <Meditate />
      </View>
      <View className="w-full justify-center items-center z-10 bottom-10">
        <Button
          title="Редагувати профіль"
          big
          logout
          onPress={() => setToggleModal(true)}
        />
        <View className="mt-4" />
        <Button
          title="Змінити пароль"
          big
          logout
          onPress={() => setPasswordModal(true)}
        />
      </View>
      <Modal
        animationType="fade"
        visible={toggleModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <KeyboardAvoidingView behavior="height" className="flex-1">
          <View
            style={{
              backgroundColor: theme.colors.bgColor,
              flex: 1,
            }}>
            <Title
              t="Редагування профілю"
              style={{
                textAlign: 'center',
                paddingTop: 40,
                fontSize: 23,
                fontWeight: '600',
              }}
            />
            <View className="mt-[20px] p-4">
              <Text className="text-left text-xl text-black">Ім'я</Text>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  alignSelf: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginTop: scale(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  height: scale(60),
                }}>
                <Image source={image('profile')} />
                <AppTextInput
                  onChangeText={text => setNewName(text)}
                  returnKeyType="done"
                  placeholder="Ім'я"
                  style={{
                    width: '90%',
                    marginHorizontal: 20,
                    fontSize: 20,
                    textAlign: 'right',
                  }}
                  value={newName}
                />
              </View>
            </View>

            <View className="p-4">
              <Text className="text-left text-xl text-black">
                Вибрати стать
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setNewSex('F')}
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    paddingVertical: 36,
                    paddingHorizontal: 20,
                    backgroundColor: newsex === 'F' ? '#D66366' : 'white',
                    borderRadius: 12,
                    height: 100,
                  }}>
                  <AppText
                    style={{
                      color: newsex === 'F' ? 'white' : '#D66366',
                      fontSize: 20,
                    }}>
                    Жіночий
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setNewSex('M')}
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    marginTop: scale(15),
                    paddingVertical: 36,
                    paddingHorizontal: 20,
                    backgroundColor: newsex === 'M' ? '#D66366' : 'white',
                    borderRadius: 12,
                    height: 100,
                  }}>
                  <AppText
                    style={{
                      color: newsex === 'M' ? 'white' : '#D66366',
                      fontSize: 20,
                    }}>
                    Чоловічий
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.bgColor,
            }}
            className="w-full flex items-center p-4">
            <View className="flex flex-col h-[130px] justify-between w-full">
              <AppButton className="" onPress={() => submit()} style={{}}>
                Змінити деталі
              </AppButton>

              <AppButton onPress={() => setToggleModal(false)} style={{}}>
                Назад
              </AppButton>
            </View>
          </View>
        </KeyboardAvoidingView>
        {updateloader && (
          <View style={{ position: 'absolute', top: '60%', left: '50%' }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </Modal>

      <Modal visible={passwordModal}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          behavior="height"
          className="flex-1">
          <View
            className="flex-1 px-8 py-4"
            style={{
              backgroundColor: theme.colors.bgColor,
            }}>
            <Title
              t="Змінити пароль"
              style={{
                textAlign: 'center',
                paddingTop: 60,
                fontSize: 23,
                fontWeight: '600',
                marginBottom: 40,
              }}
            />
            <View className="p-4">
              <Text className="text-black text-left text-xl">
                Ваш новий пароль
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  marginTop: scale(14),
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  height: scale(60),
                }}>
                <Image source={image('lock')} />
                <AppTextInput
                  onChangeText={text => setPassword(text)}
                  returnKeyType="done"
                  secureTextEntry
                  placeholder="Пароль"
                  style={{
                    width: '90%',
                    marginHorizontal: 20,
                    fontSize: 20,
                    textAlign: 'right',
                  }}
                />
              </View>
            </View>
            <View className="p-4 mt-[10px]">
              <Text className="text-xl text-left text-black">
                Повторіть пароль
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginTop: scale(14),
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  height: scale(60),
                }}>
                <Image source={image('lock')} />
                <AppTextInput
                  onChangeText={text => setVerifyPassword(text)}
                  returnKeyType="done"
                  secureTextEntry
                  placeholder="Перевірка пароля"
                  style={{
                    width: '90%',
                    marginHorizontal: 20,
                    fontSize: 20,
                    textAlign: 'right',
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.bgColor,
            }}
            className="w-full flex items-center p-4">
            <View className="flex flex-col h-[120px] justify-between w-full">
              <AppButton onPress={() => submitChangePassword()} style={{}}>
                Змінити пароль
              </AppButton>
              <AppButton onPress={() => setPasswordModal(false)} style={{}}>
                Назад
              </AppButton>
            </View>
          </View>
        </KeyboardAvoidingView>
        {updateloader && (
          <View style={{ position: 'absolute', top: '60%', left: '50%' }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default Details;
