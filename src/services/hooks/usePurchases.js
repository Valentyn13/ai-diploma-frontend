import logger from '@utils/logger';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import { useSelector } from 'react-redux';

const REVENUECAT_PUB_KEY = 'oyugnzaOUAuXBNLgXifSFaJWEsrpfjkO';

export default function usePurchases() {
  const [plans, setPlans] = useState({});
  const [hasPremium, setPremium] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [identify, setIdentify] = useState(false);
  const { id } = useSelector(state => state.userDetails);

  const getOfferings = useCallback(async () => {
    try {
      if (Object.keys(plans).length === 0) {
        const offerings = await Purchases.getOfferings();

        setPlans(offerings.current);
        setIdentify(true);
        // return offerings;
      }
    } catch (e) {
      logger.error('usePurchases: failed to get offerings', e.message || e);
      // return null;
    }
  }, [plans]);

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    if (id) {
      // userid use as a appUserID to identify unique
      Purchases.configure({ apiKey: REVENUECAT_PUB_KEY, appUserID: id });
    } else {
      Purchases.configure({ apiKey: REVENUECAT_PUB_KEY });
    }
    getOfferings();
  }, [getOfferings, id]);

  const setPurchaserIdentity = useCallback(async () => {
    try {
      // console.log(`usePurchases: setting identity: ${id}`);
      await Purchases.getAppUserID(id);
      const purchaserInfo = await Purchases.getPurchaserInfo();
      if (Object.entries(purchaserInfo.entitlements.active).length) {
        setPremium(true);
      } else {
        setPremium(false);
      }
    } catch (e) {
      logger.error('usePurchases: failed to set identity', e.message || e);
    }
  }, [id]);

  const purchasePlan = useCallback(async packageToPurchase => {
    try {
      setPurchasing(true);
      // setTimeout(() => {
      //   setPurchasing(false)
      // }, 8000)
      const response = await Purchases.purchasePackage(packageToPurchase);

      if (response.purchaserInfo.entitlements.active) {
        setPurchasing(false);
        setPremium(true);
        return true;
      }
    } catch (e) {
      logger.error('usePurchases: failed to purchase package', e.message || e);
      if (!e.userCancelled) {
        Alert.alert('Failed to purchase plan!');
      }

      return false;
    } finally {
      setPurchasing(false);
    }
  }, []);

  return {
    plans,
    hasPremium,
    purchasing,
    setPurchaserIdentity,
    purchasePlan,
    identify,
  };
}
