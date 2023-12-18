import { TouchableIcon } from '@common/components/Styled';
import SubscriptionPoint from '@common/components/SubscriptionPoint';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import get from '@utils/get';
import React, { useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Purchases from 'react-native-purchases';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { firstCourseSelector } from 'store/selectors';
import styled from 'styled-components';

import logo from '../../../common/assets/images/logoWhite.png';
import subscribe2Bg from '../../../common/assets/images/subscribe2Bg.png';

const Subscribe2 = () => {
  const route = useRoute();
  const {
    id,
    loder,
    email,
    name: userName,
  } = useSelector(state => state.userDetails);
  const [purchasing, setPurchasing] = useState(false);
  const [hasPremium, setPremium] = useState(false);
  const { goBack } = useNavigation();
  const firstCourse = useSelector(firstCourseSelector);
  const onClose = () => goBack();
  const { item, firstRun } = route.params || {};
  const name = item ? item?.name : null;
  const { plans } = usePurchases();
  const availablePackages = get(plans, 'availablePackages', []);
  const { navigate } = useNavigation();
  const amplitudeInstance = useAmplitude();

  const Spinner = styled.ActivityIndicator.attrs({
    size: 'large',
  })``;

  const Overlay = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(40, 40, 40, 0.8);
    justify-content: center;
    opacity: 0.8;
  `;

  const EmptyOverlay = styled.View`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ffefd7;
    justify-content: center;
    opacity: 0.8;
  `;

  const initRudderstack = async () => {
    await rudderClient.setup('2Ah3U42Qc6y9v3PB4w8sKYhvkkJ', {
      dataPlaneUrl: 'https://regatomxprg.dataplane.rudderstack.com',
      // trackLifecycleEvents: true,
      logLevel: RUDDER_LOG_LEVEL.DEBUG,
      flushQueueSize: 1,
      configRefreshInterval: 1,
    });
  };
  React.useEffect(() => {
    initRudderstack();
  }, []);
  const PlanItem = ({ onPress, price, title, packageType }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: scale(130),
          height: scale(110),
          backgroundColor: '#273051',
        }}>
        {packageType === 'MONTHLY' ? (
          <>
            <Image
              source={require('../../../common/assets/images/meditationRight.png')}
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'left',
                color: 'white',
                fontSize: scale(14),
                lineHeight: 22,
                paddingTop: 10,
              }}
              numberOfLines={2}>
              מנוי חודשי
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'left',
                color: 'white',
                fontSize: scale(14),
                lineHeight: 22,
                paddingTop: 10,
              }}
              numberOfLines={2}>
              19.90 ﻿₪ בחודש
            </Text>
          </>
        ) : (
          <>
            <Image
              source={require('../../../common/assets/images/meditationsLeft.png')}
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
                marginTop: 10,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'left',
                color: 'white',
                fontSize: scale(14),
                lineHeight: 22,
                paddingTop: 10,
              }}
              numberOfLines={2}>
              מנוי שנתי
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'left',
                color: 'white',
                fontSize: scale(12),
                lineHeight: 22,
                paddingTop: 10,
              }}
              numberOfLines={2}>
              159.90 ₪ שנתי
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const purchase = packageToPurchase => {
    setPurchasing(true);
    return new Promise(function (resolve, reject) {
      try {
        Purchases.purchasePackage(packageToPurchase)
          .then(result => {
            if (result.purchaserInfo.entitlements.active) {
              setPurchasing(false);
              setPremium(true);
              resolve(true);
            } else {
              setPurchasing(false);
              reject(false);
            }
          })
          .catch(e => {
            setPurchasing(false);
            reject(false);
          });
      } catch (e) {
        console.error(
          'usePurchases: failed to purchase package',
          e.message || e,
        );
        if (!e.userCancelled) {
          Alert.alert('Failed to purchase plan!');
        }
        setPurchasing(false);
        reject(false);
      }
    });
  };

  const numberOfPackage = availablePackages.length || 0;
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8EE' }}>
      {numberOfPackage > 0 ? (
        <>
          <View style={{ backgroundColor: '#513F73' }}>
            <View
              style={{
                marginTop: Platform.OS === 'android' ? 30 : 40,
                alignSelf: 'flex-start',
                marginLeft: 30,
              }}>
              <TouchableIcon name="close" onPress={onClose} color="white" />
            </View>
            <Image
              source={logo}
              style={{ width: 80, height: 80, alignSelf: 'center' }}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <View style={{ width: '80%', alignSelf: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontSize: scale(20),
                  fontWeight: '500',
                  paddingBottom: 10,
                }}>
                קחו רגע לעצמכם , מגיע לכם .
              </Text>
            </View>
            <SubscriptionPoint text="point7" showIcon={true} />
            <SubscriptionPoint text="point2" showIcon={true} />
            <SubscriptionPoint text="point3" showIcon={true} />
            <SubscriptionPoint text="point4" showIcon={true} />
            <SubscriptionPoint text="point5" showIcon={true} />
            <SubscriptionPoint text="point6" showIcon={true} />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={subscribe2Bg}
              style={{ height: scale(250), width: '100%' }}
              resizeMethod="scale"
              resizeMode="stretch"
            />
            <View
              style={{
                position: 'absolute',
                width: '100%',
                bottom: scale(40),
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {availablePackages.map(plan => {
                if (plan.packageType !== 'CUSTOM') {
                  return (
                    <PlanItem
                      {...{
                        key: get(plan, 'identifier'),
                        title: get(plan, 'product.title'),
                        price: get(plan, 'product.price_string'),
                        packageType: plan.packageType,
                        onPress: async () => {
                          purchase(plan)
                            .then(async result => {
                              //    console.log("i am resoleve")
                              const revenueLog =
                                await amplitudeInstance.logRevenue({
                                  price: plan.product.price,
                                  productId: plan.product.identifier,
                                  revenueType: plan.packageType,
                                });
                              await rudderClient.track('Subscribe', {
                                price: plan.product.price,
                                productId: plan.product.identifier,
                                revenueType: plan.packageType,
                              });
                              await logEvent('Subscribe', {
                                userName: userName,
                                email: email,
                                price: plan.product.price,
                                productId: plan.product.identifier,
                                revenueType: plan.packageType,
                              });
                              if (firstRun) {
                                if (firstCourse) {
                                  const courseMeditations =
                                    firstCourse.meditations;
                                  if (
                                    courseMeditations &&
                                    courseMeditations.length > 0
                                  ) {
                                    const item = courseMeditations[0];
                                    navigate('Home', { navigateToItem: item });
                                  } else {
                                    navigate('Home');
                                  }
                                } else {
                                  navigate('Home');
                                }
                              } else {
                                navigate('Home');
                              }
                            })
                            .catch(error => {
                              // console.log("hello error", error);
                              navigate('Home');
                            });
                        },
                      }}
                    />
                  );
                }
              })}
            </View>
          </View>
          {purchasing && (
            <Overlay>
              <Spinner />
            </Overlay>
          )}
        </>
      ) : (
        <EmptyOverlay>
          <Spinner />
        </EmptyOverlay>
      )}
    </View>
  );
};

export default Subscribe2;
