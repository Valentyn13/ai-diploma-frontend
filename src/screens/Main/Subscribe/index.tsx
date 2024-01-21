import SubscriptionPoint from '@common/components/SubscriptionPoint';
import { KEY_PLAYED_FIRST } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PurchasesPackage } from '@revenuecat/purchases-typescript-internal';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import * as Sentry from '@sentry/react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import i18n from '@services/localization/i18n';
import { logEvent } from '@utils/analytics';
import get from '@utils/get';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import subscribe2Bg from '../../../common/assets/images/sub-bg.jpg';

const PackageItem: React.FC<{
  onPress: () => void;
  selected: boolean;
  title: string;
  subTitle?: React.ReactNode;
  monthPrice: number;
  showBadge?: boolean;
}> = ({
  onPress,
  selected,
  title,
  monthPrice,
  subTitle = <></>,
  showBadge = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={3}
      onPress={onPress}
      className={`relative flex justify-center rounded-md p-2 h-14 w-full mb-3 border border-white bg-transparent ${
        selected ? 'border-[#1E2340] border-[3px]' : 'border-[#1E2340]'
      } transition-all duration-300`}>
      {showBadge && (
        <View className="absolute -top-3 right-4 px-4 h-5 bg-[#F4CE21] rounded-3xl flex justify-center items-center">
          <Text className="text-black text-xs">שבוע ניסיון חינם</Text>
        </View>
      )}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-col justify-center items-start">
          <Text
            className={`text-right text-lg text-[#1E2340] ${
              selected ? 'font-bold' : 'font-medium'
            }`}>
            {title}
          </Text>
          {subTitle}
        </View>
        <Text
          className={`text-center text-base text-[#1E2340] ${
            selected ? 'font-bold' : 'font-medium'
          }`}>
          {monthPrice.toFixed(2)}
          <Text
            className={`text-xs font-normal ${
              selected ? 'font-bold' : 'font-medium'
            }`}>
            ₪/חודש
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const PLANS = {
  annual: {
    identifier: '$rc_annual',
    offeringIdentifier: 'Premium',
    packageType: 'ANNUAL',
    product: {
      currencyCode: 'ILS',
      defaultOption: [Object],
      description: 'גישה חופשית לכל התכנים',
      discounts: null,
      identifier: 'yearly_subscription_365:p1y',
      introPrice: null,
      presentedOfferingIdentifier: 'Premium',
      price: 149.9,
      priceString: '₪149.90',
      productCategory: 'SUBSCRIPTION',
      productType: 'AUTO_RENEWABLE_SUBSCRIPTION',
      subscriptionOptions: [Array],
      subscriptionPeriod: 'P1Y',
      title: 'מנוי שנתי (רגע)',
    },
  },
  availablePackages: [
    {
      identifier: '$rc_monthly',
      offeringIdentifier: 'Premium',
      packageType: 'MONTHLY',
      product: [Object],
    },
    {
      identifier: '$rc_annual',
      offeringIdentifier: 'Premium',
      packageType: 'ANNUAL',
      product: [Object],
    },
    {
      identifier: 'annual_without_trial',
      offeringIdentifier: 'Premium',
      packageType: 'CUSTOM',
      product: [Object],
    },
  ],
  identifier: 'Premium',
  lifetime: null,
  metadata: {},
  monthly: {
    identifier: '$rc_monthly',
    offeringIdentifier: 'Premium',
    packageType: 'MONTHLY',
    product: {
      currencyCode: 'ILS',
      defaultOption: [Object],
      description: 'גישה חופשית לכל התכנים',
      discounts: null,
      identifier: 'monthlysubscription:p1m',
      introPrice: [Object],
      presentedOfferingIdentifier: 'Premium',
      price: 19.9,
      priceString: '₪19.90',
      productCategory: 'SUBSCRIPTION',
      productType: 'AUTO_RENEWABLE_SUBSCRIPTION',
      subscriptionOptions: [Array],
      subscriptionPeriod: 'P1M',
      title: 'מנוי חודשי (רגע)',
    },
  },
  serverDescription: 'Unlock Premium Content',
  sixMonth: null,
  threeMonth: null,
  twoMonth: null,
  weekly: null,
};

const Subscribe: FC = ({ navigation }) => {
  const route = useRoute();
  const { goBack, navigate } = useNavigation();
  const { plans, makePurchase, purchasing } = usePurchases();
  const { email, name: userName } = useSelector(
    (state: any) => state.userDetails,
  );
  const availablePackages = get(plans, 'availablePackages', []);

  const amplitudeInstance = useAmplitude();
  const numberOfPackage = availablePackages.length || 0;

  // @ts-ignore
  const isFirstTime = route.params?.isFirstTime as boolean;

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

  const [selectedPlan, setSelectedPlan] = useState('annual');

  const onClose = async () => {
    await AsyncStorage.setItem(KEY_PLAYED_FIRST, true.toString());

    if (isFirstTime) {
      navigation.replace('Main', { screen: 'Home' });
    } else {
      goBack();
    }
  };

  const onSubscribe = async (plan: PurchasesPackage) => {
    try {
      await makePurchase(plan);

      amplitudeInstance.logRevenue({
        price: plan.product.price,
        productId: plan.product.identifier,
        revenueType: plan.packageType,
      });

      try {
        await rudderClient.track('Subscribe', {
          price: plan.product.price,
          productId: plan.product.identifier,
          revenueType: plan.packageType,
        });
      } catch (e) {
        console.log(e);
      }

      logEvent('Subscribe', {
        userName,
        email,
        price: plan.product.price,
        productId: plan.product.identifier,
        revenueType: plan.packageType,
      });

      onClose();
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('מצטערים קרתה תקלה, אנא פנו לתמיכה שלנו באינסטגרם @rega.app');
    }
  };

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView edges={['top']} className="bg-[#513F73]" />
      <View className="flex-1">
        <Image
          source={subscribe2Bg}
          style={{
            position: 'absolute',
            width: '100%',
            height: '120%',
          }}
          resizeMode="cover"
        />

        {numberOfPackage > 0 ? (
          <>
            <View className="relative">
              <Icon2
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  zIndex: 1,
                }}
                size={24}
                name="x"
                onPress={onClose}
                color="white"
              />
              <Text className="text-white text-center font-black text-2xl mt-12 mb-6">
                {isFirstTime
                  ? 'הירשמו ונסו 7 ימים חינם'
                  : 'קחו רגע לעצמכם, מגיע לכם.'}
              </Text>
              <SubscriptionPoint text="point1" />
              <SubscriptionPoint text="point2" />
              <SubscriptionPoint text="point3" />
            </View>

            <View className="mt-10 self-center w-8/12">
              <Text className="text-white text-center text-lg">
                קחו רגע לעצמכם - בשביל פחות מ
                <Text className="font-bold">4 שקלים בשבוע</Text>, האפליקציה שלכם
                לשנה!
              </Text>
            </View>
            <View className="relative flex-1">
              <SafeAreaView
                edges={['bottom', 'left', 'right']}
                className="w-full bg-[#FAF8F5] absolute bottom-0 self-center rounded-t-xl flex flex-col items-center p-4">
                {!isFirstTime && (
                  <View className="w-full">
                    <PackageItem
                      showBadge={true}
                      selected={selectedPlan === 'annual'}
                      onPress={() => setSelectedPlan('annual')}
                      title="מנוי שנתי"
                      monthPrice={plans.annual.product.price / 12}
                      subTitle={
                        <Text className="text-white text-center text-sm">
                          <Text
                            className={`text-[#FFC107] ${
                              selectedPlan === 'annual'
                                ? 'font-bold'
                                : 'font-medium'
                            }`}>
                            ₪{plans.annual.product.price.toFixed(2)}
                            {'  '}
                          </Text>
                          <Text
                            className={`line-through text-[#1E2340] ${
                              selectedPlan === 'annual'
                                ? 'font-bold'
                                : 'font-medium'
                            }`}>
                            ₪{(plans.monthly.product.price * 12).toFixed(2)}
                          </Text>
                        </Text>
                      }
                    />
                    <PackageItem
                      monthPrice={plans.monthly.product.price}
                      selected={selectedPlan === 'monthly'}
                      onPress={() => setSelectedPlan('monthly')}
                      title="מנוי חודשי"
                    />
                  </View>
                )}
                <View className="mt-2" />
                <TouchableOpacity
                  onPress={() => onSubscribe(plans[selectedPlan])}
                  className="bg-[#1E2340] rounded-3xl p-3 w-full">
                  <Text className="text-white text-center text-lg">
                    {isFirstTime
                      ? 'הירשמו ונסו שבוע חינם'
                      : i18n.t('subscribeBtn1')}
                  </Text>
                </TouchableOpacity>
                {isFirstTime && (
                  <Text className="text-black text-center text-xs mt-4">
                    נסו את האפליקציה במשך 7 ימים בחינם! לאחר תקופה זו יתבצע חיוב
                    אוטומטי בסך 159.90 שח עבור שנת שימוש באפליקציה. ניתן לבטל את
                    המנוי בכל רגע וללא עלות.
                  </Text>
                )}
              </SafeAreaView>
            </View>
            {purchasing && (
              <View className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/60">
                <ActivityIndicator size="large" color="#FFF" />
              </View>
            )}
          </>
        ) : (
          <View className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        )}
      </View>
    </>
  );
};

export default Subscribe;
