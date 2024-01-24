import LDClient from 'launchdarkly-react-native-client-sdk';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';

const LDContext = createContext<{
  evaluateObjectFlag: (name: string, defaultValue: any) => Promise<any>;
}>({ evaluateObjectFlag: () => Promise.resolve() });

const CONFIG = {
  mobileKey: 'mob-e5167f54-d217-407c-8f38-e3b4e8b3db3e',
};

export const LDProvider: FC<PropsWithChildren> = ({ children }) => {
  const userDetails = useSelector((state: any) => state.userDetails);
  const [ldClient, setLdClient] = useState<LDClient | null>(null);

  useEffect(() => {
    async function initLD() {
      try {
        const client = new LDClient();

        setLdClient(client);
      } catch (err) {
        console.error(err);
      }
    }
    initLD();
  }, []);

  const configure = useCallback(
    async (key: string) => {
      if (ldClient && !ldClient.isInitialized) {
        await ldClient.configure(CONFIG, {
          kind: 'user',
          key,
        });
      }
    },
    [ldClient],
  );

  useEffect(() => {
    if (userDetails.id) {
      configure(userDetails.id || '');
    }
  }, [configure, userDetails.id]);

  const evaluateObjectFlag = useCallback(
    async (name: string, defaultValue: any) => {
      try {
        return ldClient?.jsonVariation(name, defaultValue);
      } catch (err) {
        console.error(err);
        return defaultValue;
      }
    },
    [ldClient],
  );

  return (
    <LDContext.Provider value={{ evaluateObjectFlag }}>
      {children}
    </LDContext.Provider>
  );
};

export const useLDClient = () => {
  const context = useContext(LDContext);
  if (context === undefined) {
    throw new Error('useLDClient must be used within a LDProvider');
  }

  return context;
};
