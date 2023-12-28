import SubscriptionPoint from '@common/components/SubscriptionPoint';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation } from '@react-navigation/native';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { AmplitudeInstance, useAmplitude } from '@services/hooks/useAmplitude';
import i18n from '@services/localization/i18n';
import { logEvent } from '@utils/analytics';
import get from '@utils/get';
import { default as React, useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-gradients';
import Purchases from 'react-native-purchases';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

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

interface PlanItemProps {
  onPress: () => void;
}

const SubscribeButton: React.FC<PlanItemProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-3xl p-4 w-11/12 ">
      <Text className="text-[#1B1B1B] text-center text-lg leading-5">
        {i18n.t('subscribeBtn1')}
      </Text>
    </TouchableOpacity>
  );
};

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
      className={`relative flex justify-center rounded-md p-2 h-14 w-11/12 mb-3 border border-white bg-transparent ${
        selected ? 'border-white border-2' : 'border-[#2C344D]'
      } transition-all duration-300`}>
      {showBadge && (
        <View className="absolute -top-3 right-4 px-4 h-5 bg-[#F4CE21] rounded-3xl flex justify-center items-center">
          <Text className="text-black text-xs">שבוע ניסיון חינם</Text>
        </View>
      )}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-col justify-center items-start">
          <Text
            className={`text-right text-lg ${
              selected ? 'text-white' : 'text-[#2C344D]'
            }`}>
            {title}
          </Text>
          {subTitle}
        </View>
        <Text
          className={`text-center text-md font-extralight ${
            selected ? 'text-white' : 'text-[#2C344D]'
          }`}>
          {monthPrice.toFixed(2)}
          <Text className="text-xs font-extralight">₪/חודש</Text>
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

const Subscribe: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const onClose = () => goBack();
  const { plans, setPurchaserIdentity } = usePurchases();
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const { email, name: userName } = useSelector(
    (state: any) => state.userDetails,
  );
  const availablePackages = get(plans, 'availablePackages', []);

  const amplitudeInstance: AmplitudeInstance = useAmplitude();
  const numberOfPackage = availablePackages.length || 0;

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

  const purchase = (packageToPurchase: any) => {
    return new Promise<void>((resolve, reject) => {
      try {
        Purchases.purchasePackage(packageToPurchase)
          .then((result: any) => {
            if (result.purchaserInfo.entitlements.active) {
              setPurchasing(false);
              resolve();
            } else {
              setPurchasing(false);
              reject();
            }
          })
          .catch((e: any) => {
            console.log('i am from promise catch');
            setPurchasing(false);
            reject();
          });
      } catch (e) {
        console.error(
          'usePurchases: failed to purchase package',
          e.message || e,
        );
        if (!e.userCancelled) {
          Alert.alert('Failed to purchase plan!');
        }

        reject();
      }
    });
  };

  const colorList = [
    { offset: '0%', color: '#4A90E2', opacity: '1' },
    { offset: '100%', color: '#003399', opacity: '1' },
  ];

  const [selectedPlan, setSelectedPlan] = useState('annual');

  const onSubscribe = async (plan: any) => {
    setPurchasing(true);
    purchase(plan)
      .then(async result => {
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
      })
      .catch(error => {
        console.log('hello error', error);
      })
      .finally(() => {
        setPurchasing(false);
        setPurchaserIdentity();
        navigate('Main', { screen: 'Home' });
      });
  };

  return (
    <>
      <StatusBar hidden />
      <SafeAreaView edges={['top']} className="bg-[#003399]" />
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        className="flex-1 bg-[#0A0E1E]">
        <View className="absolute w-full h-full">
          <LinearGradient colorList={colorList} angle={90} />
        </View>

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
                קחו רגע לעצמכם, מגיע לכם.
              </Text>
              <SubscriptionPoint text="Point1" showIcon />
              <SubscriptionPoint text="point2" showIcon />
              <SubscriptionPoint text="point3" showIcon />
            </View>
            <View className="mt-10 self-center px-12">
              <Text className="text-white text-left">
                ״אני פשוט מכורה לאפליקציה, ואני ישנה טוב בקטע לא נורמלי״
              </Text>

              <View className="flex flex-row justify-between items-center mt-3">
                <Text className="text-left text-white">-עינב</Text>
                <Text className="text-left text-white">⭐⭐⭐⭐⭐</Text>
              </View>
            </View>
            <View className="relative flex-1">
              <View className="w-full bg-[#0A1129] absolute bottom-0 self-center h-68 rounded-t-xl flex flex-col items-center p-4">
                <PackageItem
                  showBadge={true}
                  selected={selectedPlan === 'annual'}
                  onPress={() => setSelectedPlan('annual')}
                  title="מנוי שנתי"
                  monthPrice={plans.annual.product.price / 12}
                  subTitle={
                    <Text className="text-white text-center text-sm leading-5">
                      <Text className="text-[#FFC107]">
                        ₪{plans.annual.product.price.toFixed(2)}{' '}
                      </Text>
                      <Text
                        className={`line-through ${
                          selectedPlan === PLANS.annual.identifier
                            ? 'text-white'
                            : 'text-[#2C344D]'
                        } `}>
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
                <View className="mt-5" />
                <SubscribeButton
                  onPress={() => onSubscribe(plans[selectedPlan])}
                />
                <TouchableOpacity onPress={onClose}>
                  <Text className="text-white text-center text-xs mt-5 underline">
                    לא, תודה
                  </Text>
                </TouchableOpacity>
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
      </SafeAreaView>
    </>
  );
};

export default Subscribe;
