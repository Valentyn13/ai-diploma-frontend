import { PurchasesPackage } from '@revenuecat/purchases-typescript-internal';
import { useAmplitude } from '@services/hooks/useAmplitude';
import logger from '@utils/logger';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Purchases, {
  LOG_LEVEL,
  MakePurchaseResult,
} from 'react-native-purchases';
import { useSelector } from 'react-redux';

interface PurchaseContextProps {
  plans: Record<string, PurchasesPackage>;
  hasPremium: boolean;
  purchasing: boolean;
  identify: boolean;
  setPurchaserIdentity: () => Promise<void>;
  makePurchase: (
    packageToPurchase: PurchasesPackage,
  ) => Promise<MakePurchaseResult>;
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
  const [hasPremium, setPremium] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [identify, setIdentify] = useState(false);
  const amplitudeInstance = useAmplitude();
  const { id, email } = useSelector(
    (state: { userDetails: { id: string; email: string } }) =>
      state.userDetails,
  );

  const REVENUECAT_PUB_KEY = 'oyugnzaOUAuXBNLgXifSFaJWEsrpfjkO';

  const getOfferings = useCallback(async () => {
    try {
      const offerings = await Purchases.getOfferings();

      if (!offerings.current) {
        throw new Error('No offerings found');
      }

      setPlans(offerings.current);
      setIdentify(true);
    } catch (e: any) {
      logger.error('usePurchases: failed to get offerings', e.message || e);
    }
  }, []);

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

  useEffect(() => {
    setPurchaserIdentity();
  }, [setPurchaserIdentity]);

  const makePurchase = useCallback(
    async (packageToPurchase: PurchasesPackage) => {
      setPurchasing(true);
      let result: MakePurchaseResult;

      try {
        result = await Purchases.purchasePackage(packageToPurchase);
      } catch (e: any) {
        const message = e.userCancelled ? 'User cancelled' : e.message || e;
        setPurchasing(false);
        logger.error('usePurchases: failed to make purchase', message);
        amplitudeInstance.logEvent('Purchase Failed', {
          error: message,
        });

        Purchases.restorePurchases();
        throw new Error(`Purchase failed: ${message}`);
      }

      if (!result?.customerInfo.entitlements.active) {
        setPurchasing(false);
        amplitudeInstance.logEvent('Purchase Failed', {
          error: 'No active entitlements',
        });
        throw new Error('Purchase failed: no active entitlements');
      }

      setPurchasing(false);
      setPremium(true);
      amplitudeInstance.logEvent('Purchase Success', { id, email });
      return result;
    },
    [amplitudeInstance, email, id],
  );

  const contextValue: PurchaseContextProps = {
    plans,
    hasPremium,
    purchasing,
    setPurchaserIdentity,
    makePurchase,
    identify,
  };

  return (
    <PurchaseContext.Provider value={contextValue}>
      {children}
    </PurchaseContext.Provider>
  );
};
