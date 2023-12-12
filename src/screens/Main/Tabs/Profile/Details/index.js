/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import AppTextInput from '@common/components/AppTextInput';
import Button from '@common/components/Button';
import { Screen, Title } from '@common/components/Styled';
import colors from '@common/theme/colors';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import PropTypes from 'deprecated-react-native-prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UserDetails = styled.View`
  margin-top: 50px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const Label = styled(Title)`
  width: 150;
`;

const Row = ({ label, value, keyValue }) => (
  <RowContainer>
    <Label k={label} />
    {keyValue ? <Label k={value} /> : <Label t={value} />}
  </RowContainer>
);

const Details = () => {
  const { name, email, sex, updateloader } = useSelector(
    state => state.userDetails,
  );
  const [toggleModal, setToggleModal] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);

  const [newName, setNewName] = React.useState('');
  const [newsex, setNewSex] = React.useState();
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = React.useState();

  const { updateProfile, changePassword } = useUpdateProfile();

  React.useEffect(() => {
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
    <Screen color={colors.bgColor}>
      <UserDetails>
        <Row label="name" value={name} />
        <Row label="sex" value={sex === 'M' ? 'male' : 'female'} keyValue />
        <Row label="email" value={email} />
      </UserDetails>
      <View style={{ position: 'absolute', bottom: 80, left: 20, right: 20 }}>
        <Button
          title="ערוך פרופיל"
          big
          logout
          onPress={() => {
            setToggleModal(true);
          }}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 10, left: 20, right: 20 }}>
        <Button
          title="שנה סיסמא"
          big
          logout
          onPress={() => {
            setPasswordModal(true);
          }}
        />
      </View>
      {/* //edit profile modal */}
      <Modal
        animationType="fade"
        visible={toggleModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
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

      {/* //password modal */}

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
    </Screen>
  );
};

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  keyValue: PropTypes.bool,
};

Row.defaultProps = {
  keyValue: false,
};

export default Details;
