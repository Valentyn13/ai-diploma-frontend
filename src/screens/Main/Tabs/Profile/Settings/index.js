/* eslint-disable react-native/no-inline-styles */
import AppTextInput from '@common/components/AppTextInput';
import Button from '@common/components/Button';
import {
  BoldTitle,
  ButtonTitle,
  Screen,
  SmallText,
  SubTitle,
} from '@common/components/Styled';
import colors from '@common/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useDeleteData from '@services/hooks/useDeleteData';
import useUpdateProfile from '@services/hooks/useUpdateProfile';
import { logEvent } from '@utils/analytics';
import { fbLogout } from '@utils/facebook';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'store/actions';
import styled from 'styled-components';

const SettingsScreen = styled(Screen)`
  justify-content: flex-end;
  padding-bottom: 50px;
`;

const Settings = ({ navigation }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  const [cancelSubscriptionModal, setCancelSubscriptionModal] =
    React.useState(false);
  const dispatch = useDispatch();
  const { name, email, isNotification, notificationTime } = useSelector(
    state => state.userDetails,
  );
  const { DeleteUserData, cancelSubsciption } = useDeleteData();
  const { saveNotification, cancelNotification } = useUpdateProfile();

  const [isNotificationLocal, setIsNotificationLocal] = React.useState(false);
  const [notificationTimeLocal, setNotificationTimeLocal] = React.useState(
    new Date(),
  );

  const amplitudeInstance = useAmplitude();
  const initRudderstack = async () => {
    await rudderClient.setup('2Ah3U42Qc6y9v3PB4w8sKYhvkkJ', {
      dataPlaneUrl: 'https://regatomxprg.dataplane.rudderstack.com',
      logLevel: RUDDER_LOG_LEVEL.DEBUG,
      flushQueueSize: 1,
      configRefreshInterval: 1,
    });
  };
  useEffect(() => {
    initRudderstack();
  }, []);

  const onLogout = async () => {
    await rudderClient.track('logout', {
      email,
      name,
    });
    await amplitudeInstance.logEvent('LOGOUT');
    await logEvent('logout', {
      email,
      name,
    });
    amplitudeInstance.uploadEvents();
    dispatch(logout());
    fbLogout();
    await AsyncStorage.removeItem('secondTime');
    navigation.navigate('Intro');
  };

  // async function onSignIn() {
  //   crashlytics().log('User signed in.');
  //   const result = await Promise.all([
  //     crashlytics().setUserId(id),
  //     crashlytics().setAttributes({
  //       email,
  //       username: name,
  //     }),
  //   ]);
  //   console.log('result', result);
  // }

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowModal(false);
      setShowTime(false);
      const currentDate = selectedDate;
      saveNotification(currentDate);
      setNotificationTimeLocal(currentDate);
    } else {
      const currentDate = selectedDate;
      setNotificationTimeLocal(currentDate);
    }
  };

  const onToggleSiwtch = e => {
    setIsNotificationLocal(e);
    if (e) {
      setShowTime(true);
    } else {
      setShowTime(false);
      cancelNotification();
    }
  };

  const onTimeSave = () => {
    setShowTime(false);
    saveNotification(notificationTimeLocal);
  };

  useEffect(() => {
    if (notificationTime) {
      setNotificationTimeLocal(new Date(notificationTime));
    }
    if (isNotification) {
      setIsNotificationLocal(isNotification);
    }
  }, [isNotification, notificationTime]);

  const openEmailClient = () => {
    // Replace 'mailto:' with the email address you want to open
    const emailAddress = 'hello@rega.co.il';
    const emailSubject = 'היי, רציתי לשאול שאלה';
    const emailBody = '';

    // Construct the email URL
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject,
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open the email client
    Linking.openURL(emailUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  return (
    <>
      <SettingsScreen color={colors.bgColor}>
        <View
          style={{
            display: 'flex',
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: 'red',
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.logoutButtonColor,
          }}>
          <ButtonTitle t="התראות" />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {isNotificationLocal === true && notificationTimeLocal !== null && (
              <ButtonTitle
                t={`כל יום ב-${notificationTimeLocal.getHours()}:${notificationTimeLocal.getMinutes()}`}
                style={{ marginLeft: 20, marginRight: 20 }}
              />
            )}
            <Switch
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              trackColor={{
                false: colors.logoutButtonColor,
                true: colors.bgColor,
              }}
              thumbColor={
                isNotificationLocal ? colors.logoutButtonColor : '#f4f3f4'
              }
              ios_backgroundColor={
                isNotification ? colors.bgColor : colors.logoutButtonColor
              }
              onValueChange={onToggleSiwtch}
              value={isNotificationLocal}
            />
          </View>
        </View>
        <Button
          title="מדיניות הפרטיות ותנאי השימוש"
          logout
          big
          onPress={() => navigation.navigate('PrivacyPolicy')}
        />
        <View style={{ height: 10 }} />
        <Button title="צור קשר" logout big onPress={openEmailClient} />
        <View style={{ height: 10 }} />
        <Button
          title="למחוק נתונים"
          logout
          big
          onPress={() => setShowModal(true)}
        />
        {/* <View style={{height: 10}} />
        <Button title="בטל רישום" logout big onPress={() => setCancelSubscriptionModal(true)} /> */}
        <View style={{ height: 10 }} />
        <Button title="logout" logout big onPress={onLogout} />
        <View style={{ height: 10 }} />
        <SmallText t={`ver: ${DeviceInfo.getVersion()}`} />
      </SettingsScreen>
      <Modal isVisible={showModal}>
        <View
          style={{
            width: '80%',
            height: '40%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <BoldTitle
            t="האם אתה בטוח?"
            style={{ textAlign: 'center', paddingVertical: 15, color: 'red' }}
          />
          <View style={{ borderWidth: 0.2, width: '100%', height: 2 }} />
          <SubTitle
            t="פעולה זו תמחק את ההעדפה שלך לצמיתות"
            style={{
              textAlign: 'left',
              paddingVertical: 15,
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          />
          <SubTitle
            t="לא תוכל לראות תוכן על סמך העדפותיך"
            style={{
              textAlign: 'left',
              paddingVertical: 10,
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          />
          <SubTitle
            t="לא תוכל לראות את התוכן המועדף עליך"
            style={{
              textAlign: 'left',
              paddingVertical: 10,
              fontSize: 14,
              paddingHorizontal: 10,
            }}
          />
          <View
            style={{
              Width: '100%',
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: 50,
            }}>
            <TouchableOpacity
              style={{
                width: 70,
                paddingVertical: 10,
                backgroundColor: 'red',
                borderRadius: 10,
              }}
              onPress={() => {
                DeleteUserData();
                setShowModal(false);
              }}>
              <SubTitle
                t="לִמְחוֹק"
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: '800',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 70,
                borderWidth: 1,
                paddingVertical: 10,
                backgroundColor: '#273051',
                borderRadius: 10,
              }}
              onPress={() => setShowModal(false)}>
              <SubTitle
                t="ביטול"
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: '800',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <CancelSubscription
        cancelSubscriptionModal={cancelSubscriptionModal}
        setCancelSubscriptionModal={setCancelSubscriptionModal}
        cancelSubsciption={cancelSubsciption}
      />
      {showTime && Platform.OS === 'android' && (
        <DateTimePicker
          value={notificationTimeLocal}
          mode="time"
          display="spinner"
          is24Hour={false}
          onChange={onChange}
        />
      )}
      <Modal isVisible={Platform.OS === 'ios' && showTime}>
        {showTime && (
          <View
            style={{
              display: 'flex',
              backgroundColor: 'white',
              marginVertical: 10,
              paddingVertical: 10,
            }}>
            <BoldTitle
              t="בחרו את השעה המתאימה"
              style={{ textAlign: 'center', paddingVertical: 10 }}
            />
            <DateTimePicker
              value={notificationTimeLocal}
              mode="time"
              display="spinner"
              is24Hour={false}
              onChange={onChange}
              textColor={colors.textColor}
            />
            <Button title="שמור" onPress={onTimeSave} />
          </View>
        )}
      </Modal>
    </>
  );
};

const CancelSubscription = ({
  cancelSubscriptionModal,
  setCancelSubscriptionModal,
  cancelSubsciption,
}) => {
  const [email, setEmail] = React.useState();
  const [reason, setReason] = React.useState();
  const dispatch = useDispatch();
  function isValidEmail(emailParam) {
    // Define a regular expression pattern for a valid email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use the test method of the regular expression object to check if the email matches the pattern
    return emailPattern.test(emailParam);
  }
  const onSend = async () => {
    if (!email || !isValidEmail(email)) {
      Alert.alert('כתובת אימייל לא חוקית');
    } else if (!reason || reason.length < 10) {
      Alert.alert('הסיבה צריכה להיות גדולה מ-10 תווים ');
    } else {
      const data = {
        email,
        reason,
      };
      dispatch(cancelSubsciption(data));
      setCancelSubscriptionModal(false);
    }
  };
  return (
    <Modal isVisible={cancelSubscriptionModal} animationIn="fadeInUp">
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 15,
        }}>
        <ScrollView contentContainerStyle={{ flex: 1, height: '70%' }}>
          <BoldTitle
            t=" בטל רישום"
            style={{ textAlign: 'center', marginVertical: 43, color: '#000' }}
          />
          <KeyboardAwareScrollView>
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: scale(14),
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
                height: scale(60),
                flexDirection: 'column',
                borderWidth: 0.6,
                alignSelf: 'center',
              }}>
              <AppTextInput
                onChangeText={text => setEmail(text)}
                value={email}
                returnKeyType="done"
                placeholder="אימייל"
                style={{
                  width: '80%',
                  marginHorizontal: 20,
                  fontSize: 20,
                  textAlign: 'right',
                }}
              />
            </View>
            <View
              style={{
                borderWidth: 0.6,
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: scale(14),
                flexDirection: 'row',
                alignItems: 'center',
                width: '95%',
                height: scale(150),
                flexDirection: 'column',
                alignSelf: 'center',
              }}>
              <AppTextInput
                onChangeText={text => setReason(text)}
                value={reason}
                returnKeyType="done"
                placeholder="סיבה"
                style={{
                  width: '80%',
                  marginHorizontal: 20,
                  fontSize: 20,
                  textAlign: 'right',
                }}
              />
            </View>
            <View
              style={{
                Width: '100%',
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginHorizontal: 20,
                marginVertical: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: 70,
                  paddingVertical: 10,
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
                onPress={onSend}>
                <SubTitle
                  t="שליחה"
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: '800',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 70,
                  borderWidth: 1,
                  paddingVertical: 10,
                  backgroundColor: '#273051',
                  borderRadius: 10,
                }}
                onPress={() => setCancelSubscriptionModal(false)}>
                <SubTitle
                  t="ביטול"
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#fff',
                    fontWeight: '800',
                  }}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    </Modal>
  );
};

CancelSubscription.propTypes = {
  cancelSubsciption: PropTypes.func.isRequired,
  cancelSubscriptionModal: PropTypes.bool.isRequired,
  setCancelSubscriptionModal: PropTypes.func.isRequired,
};

Settings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
