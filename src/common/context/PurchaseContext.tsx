import logger from '@utils/logger';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useSelector } from 'react-redux';

interface PurchaseContextProps {
  plans: Record<string, any>;
  hasPremium: boolean;
  purchasing: boolean;
  identify: boolean;
  setPurchaserIdentity: () => Promise<void>;
  purchasePlan: (packageToPurchase: any) => Promise<boolean | undefined>;
}

const PurchaseContext = createContext<PurchaseContextProps | undefined>(
  undefined,
);

export const usePurchases = (): PurchaseContextProps => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error('usePurchases must be used within a PurchasesProvider');
  }
  return context;
};

export const PurchaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [plans, setPlans] = useState<Record<string, any>>({});
  const [hasPremium, setPremium] = useState<boolean>(true);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [identify, setIdentify] = useState<boolean>(false);
  const { id } = useSelector(
    (state: { userDetails: { id: string } }) => state.userDetails,
  );

  const REVENUECAT_PUB_KEY = 'oyugnzaOUAuXBNLgXifSFaJWEsrpfjkO';

  const getOfferings = useCallback(async () => {
    try {
      if (Object.keys(plans).length === 0) {
        const offerings = await Purchases.getOfferings();

        if (!offerings.current) {
          throw new Error('No offerings found');
        }

        setPlans(offerings.current);
        setIdentify(true);
      }
    } catch (e: any) {
      logger.error('usePurchases: failed to get offerings', e.message || e);
    }
  }, [plans]);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.ERROR);

    if (id) {
      Purchases.configure({ apiKey: REVENUECAT_PUB_KEY, appUserID: id });
    } else {
      Purchases.configure({ apiKey: REVENUECAT_PUB_KEY });
    }

    getOfferings();
  }, [getOfferings, id]);

  const setPurchaserIdentity = useCallback(async () => {
    try {
      await Purchases.getAppUserID();
      const customerInfo = await Purchases.getCustomerInfo();
      if (Object.entries(customerInfo.entitlements.active).length) {
        setPremium(true);
      } else {
        setPremium(false);
      }
    } catch (e: any) {
      logger.error('usePurchases: failed to set identity', e.message || e);
    }
  }, []);

  const purchasePlan = useCallback(async (packageToPurchase: any) => {
    try {
      setPurchasing(true);
      const response = await Purchases.purchasePackage(packageToPurchase);

      if (response.customerInfo.entitlements.active) {
        setPurchasing(false);
        setPremium(true);
        return true;
      }
    } catch (e: any) {
      logger.error('usePurchases: failed to purchase package', e.message || e);
      if (!e.userCancelled) {
        Alert.alert('Failed to purchase plan!');
      }

      return false;
    } finally {
      setPurchasing(false);
    }
  }, []);

  const contextValue: PurchaseContextProps = {
    plans,
    hasPremium,
    purchasing,
    setPurchaserIdentity,
    purchasePlan,
    identify,
  };

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
};
