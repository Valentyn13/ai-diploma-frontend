import subscribe2Bg from '@common/assets/images/subscribe2Bg.png';
import { SubTitle, TouchableIcon } from '@common/components/Styled';
import SubscriptionPoint from '@common/components/SubscriptionPoint';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import get from '@utils/get';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Purchases from 'react-native-purchases';
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { coursesSelector } from 'store/selectors';
import styled from 'styled-components';

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

const Spinner = styled.ActivityIndicator.attrs({
  size: 'large',
})``;

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

const PlanItem = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#273051',
        height: 40,
        width: '80%',
        position: 'absolute',
        bottom: scale(20),
        left: verticalScale(30),
      }}>
      <SubTitle
        k="subscribeBtn1"
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          color: 'white',
          fontSize: 16,
          lineHeight: 19,
          paddingTop: 10,
        }}
      />
    </TouchableOpacity>
  );
};

const Subscribe = () => {
  const route = useRoute();
  const { goBack } = useNavigation();
  const courses = useSelector(coursesSelector);
  const onClose = () => goBack();
  const firstRun = route.params?.firstRun;
  const { plans } = usePurchases();
  const [purchasing, setPurchasing] = useState(false);
  const {
    id,
    loder,
    email,
    name: userName,
  } = useSelector(state => state.userDetails);
  const availablePackages = get(plans, 'availablePackages', []);

  const { navigate } = useNavigation();
  const amplitudeInstance = useAmplitude();
  const numberOfPackage = availablePackages.length || 0;

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

  const purchase = packageToPurchase => {
    setPurchasing(true);
    return new Promise(function (resolve, reject) {
      try {
        Purchases.purchasePackage(packageToPurchase)
          .then(result => {
            if (result.purchaserInfo.entitlements.active) {
              setPurchasing(false);
              resolve(true);
            } else {
              setPurchasing(false);
              reject(false);
            }
          })
          .catch(e => {
            console.log('i am from  promise catch');
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

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8EE' }}>
      {numberOfPackage > 0 ? (
        <>
          <View style={{ backgroundColor: '#513F73' }}>
            <View
              style={{
                marginTop: Platform.OS === 'android' ? 30 : 50,
                alignSelf: 'flex-start',
                marginLeft: 30,
              }}>
              <TouchableIcon name="close" onPress={onClose} color="white" />
            </View>
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
            <SubscriptionPoint text="Point1" showIcon />
            <SubscriptionPoint text="point2" showIcon />
            <SubscriptionPoint text="point3" showIcon />
            <SubscriptionPoint text="point4" showIcon />
            <SubscriptionPoint text="point5" showIcon />
            <SubscriptionPoint text="point6" showIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={subscribe2Bg}
              style={{ width: '100%', height: scale(350) }}
              resizeMethod="scale"
              resizeMode="stretch"
            />
            <View
              style={{
                position: 'absolute',
                bottom: scale(80),
                left: verticalScale(40),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                }}>
                <SubTitle
                  k="subscribeBottomText"
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    lineHeight: 19,
                    fontWeight: '400',
                  }}
                />
              </View>
            </View>
            {availablePackages.map(plan => {
              if (plan.packageType === 'CUSTOM') {
                return (
                  <PlanItem
                    {...{
                      key: get(plan, 'identifier'),
                      title: get(plan, 'product.title'),
                      price: get(plan, 'product.price_string'),
                      onPress: async () => {
                        purchase(plan)
                          .then(async result => {
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
                              userName,
                              email,
                              price: plan.product.price,
                              productId: plan.product.identifier,
                              revenueType: plan.packageType,
                            });
                            if (firstRun) {
                              if (courses && courses.length > 0) {
                                const courseMeditations =
                                  courses[0].meditations;
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
                            console.log('hello error', error);
                            navigate('Home');
                          });
                      },
                    }}
                  />
                );
              }
            })}
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

PlanItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired,
};

export default Subscribe;
