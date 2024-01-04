import { PurchasesPackage } from '@revenuecat/purchases-typescript-internal';
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
  plans: Record<string, any>;
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
  const { id } = useSelector(
    (state: { userDetails: { id: string } }) => state.userDetails,
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
        setPurchasing(false);
        logger.error('usePurchases: failed to make purchase', e.message || e);
        throw new Error('Purchase failed', e.message || e);
      }

      if (!result?.customerInfo.entitlements.active) {
        setPurchasing(false);
        throw new Error('Purchase failed');
      }

      setPurchasing(false);
      setPremium(true);
      return result;
    },
    [],
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
