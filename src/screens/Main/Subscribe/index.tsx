import SubscriptionPoint from '@common/components/SubscriptionPoint';
import { usePurchases } from '@common/context/PurchaseContext';
import { useNavigation } from '@react-navigation/native';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import i18n from '@services/localization/i18n';
import { logEvent } from '@utils/analytics';
import get from '@utils/get';
import React, { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'react-native-gradients';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

interface PlanItemProps {
  onPress: () => void;
}

const SubscribeButton: React.FC<PlanItemProps> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-3xl p-3 w-full">
    <Text className="text-[#1B1B1B] text-center text-lg">
      {i18n.t('subscribeBtn1')}
    </Text>
  </TouchableOpacity>
);

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
          className={`text-center text-base font-normal ${
            selected ? 'text-white' : 'text-[#2C344D]'
          }`}>
          {monthPrice.toFixed(2)}
          <Text className="text-xs font-normal">₪/חודש</Text>
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

const Subscribe: FC = () => {
  const { goBack } = useNavigation();
  const { plans, makePurchase, purchasing } = usePurchases();
  const { email, name: userName } = useSelector(
    (state: any) => state.userDetails,
  );
  const availablePackages = get(plans, 'availablePackages', []);

  const amplitudeInstance = useAmplitude();
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

  const colorList = [
    { offset: '0%', color: '#4A90E2', opacity: '1' },
    { offset: '100%', color: '#003399', opacity: '1' },
  ];

  const [selectedPlan, setSelectedPlan] = useState('annual');

  const onSubscribe = async (plan: any) => {
    try {
      await makePurchase(plan);
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

      logEvent('Subscribe', {
        userName,
        email,
        price: plan.product.price,
        productId: plan.product.identifier,
        revenueType: plan.packageType,
      });

      goBack();
    } catch (e) {
      Alert.alert('מצטערים קרתה תקלה, אנא פנו לתמיכה שלנו');
    }
  };

  return (
    <>
      <StatusBar hidden />
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
                onPress={goBack}
                color="white"
              />
              <Text className="text-white text-center font-black text-2xl mt-12 mb-6">
                קחו רגע לעצמכם, מגיע לכם.
              </Text>
              <SubscriptionPoint text="point1" showIcon />
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
              <View className="w-full bg-[#0A1129] absolute bottom-0 self-center h-80 rounded-t-xl flex flex-col items-center p-4">
                <PackageItem
                  showBadge={true}
                  selected={selectedPlan === 'annual'}
                  onPress={() => setSelectedPlan('annual')}
                  title="מנוי שנתי"
                  monthPrice={plans.annual.product.price / 12}
                  subTitle={
                    <Text className="text-white text-center text-sm">
                      <Text
                        className={
                          selectedPlan === 'annual'
                            ? 'text-[#FFC107]'
                            : 'text-[#2C344D]'
                        }>
                        ₪{plans.annual.product.price.toFixed(2)}
                        {'  '}
                      </Text>
                      <Text
                        className={`line-through ${
                          selectedPlan === 'annual'
                            ? 'text-white'
                            : 'text-[#2C344D]'
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
                <View className="mt-2" />
                <SubscribeButton
                  onPress={() => onSubscribe(plans[selectedPlan])}
                />
                <TouchableOpacity onPress={goBack}>
                  <Text className="text-white text-center text-base mt-4 underline">
                    לא, תודה
                  </Text>
                </TouchableOpacity>
                <Text className="text-white text-center text-xs mt-4">
                  נסו את האפליקציה במשך 7 ימים בחינם! לאחר תקופה זו יתבצע חיוב
                  אוטומטי בסך 159.90 שח עבור שנת שימוש באפליקציה. ניתן לבטל את
                  המנוי בכל רגע וללא עלות.
                </Text>
              </View>
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
      </SafeAreaView>
    </>
  );
};

export default Subscribe;
