import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import Button from '@common/components/Button';
import { Title } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import { CircleButton } from '@common/components/buttons/CircleButton';
import colors from '@common/theme/colors';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
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
  const { name, email, sex, updateloader } = useSelector(
    (state: any) => state.userDetails,
  );
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
      Alert.alert('הסיסמה לא תואמת');
    }
  };

  return (
    <SafeAreaView className="flex-1 p-8 bg-[#fdedd6]">
      <View className="-ml-4 mb-4 -mt-4 z-10">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={navigation.goBack}
          size={40}
          icon="chevron-right"
        />
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
          title="ערוך פרופיל"
          big
          logout
          onPress={() => setToggleModal(true)}
        />
        <View className="mt-4" />
        <Button
          title="שנה סיסמא"
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
        <View
          style={{ flex: 1, borderWidth: 2, backgroundColor: colors.bgColor }}>
          <Title
            t="עריכת פרופיל"
            style={{
              textAlign: 'center',
              paddingTop: 60,
              fontSize: 23,
              fontWeight: 'bold',
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 10,
              alignSelf: 'center',
              paddingHorizontal: 10,
              borderRadius: 8,
              marginTop: scale(40),
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              height: scale(60),
            }}>
            <Image source={image('profile')} />
            <AppTextInput
              onChangeText={text => setNewName(text)}
              returnKeyType="done"
              placeholder="שם פרטי"
              style={{
                width: '90%',
                marginHorizontal: 20,
                fontSize: 20,
                textAlign: 'right',
              }}
              value={newName}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              width: '90%',
              marginTop: 30,
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
                נקבה
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
                זכר
              </AppText>
            </TouchableOpacity>
          </View>
          <View
            style={{ position: 'absolute', bottom: 80, alignSelf: 'center' }}>
            <AppButton onPress={() => submit()} style={{}}>
              עדכן פרופיל
            </AppButton>
          </View>
          <View
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
            <AppButton onPress={() => setToggleModal(false)} style={{}}>
              לְבַטֵל
            </AppButton>
          </View>
        </View>
        {updateloader && (
          <View style={{ position: 'absolute', top: '60%', left: '50%' }}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </Modal>

      <Modal visible={passwordModal}>
        <View
          style={{ flex: 1, borderWidth: 2, backgroundColor: colors.bgColor }}>
          <Title
            k="Edit profile"
            style={{
              textAlign: 'center',
              paddingTop: 60,
              fontSize: 23,
              fontWeight: 'bold',
            }}
          />
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
              placeholder="סיסמא"
              style={{
                width: '90%',
                marginHorizontal: 20,
                fontSize: 20,
                textAlign: 'right',
              }}
            />
          </View>
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
              placeholder="וידוא סיסמא"
              style={{
                width: '90%',
                marginHorizontal: 20,
                fontSize: 20,
                textAlign: 'right',
              }}
            />
          </View>

          <View
            style={{ position: 'absolute', bottom: 80, alignSelf: 'center' }}>
            <AppButton onPress={() => submitChangePassword()} style={{}}>
              שנה סיסמא
            </AppButton>
          </View>
          <View
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
            <AppButton onPress={() => setPasswordModal(false)} style={{}}>
              לְבַטֵל
            </AppButton>
          </View>
        </View>
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
