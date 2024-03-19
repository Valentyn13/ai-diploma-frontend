import { useUser } from '@services/hooks/useUser';
import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';
import React, { FC, PropsWithChildren, useEffect } from 'react';

const PROJECT_ID = 'D54TcUEfUjYyqMRNjX2bLu';

const WithFeatureFlag: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user.id) {
      flagsmith.identify(user.id);
    } else {
      flagsmith.logout();
    }
  }, [user.id]);

  return (
    <FlagsmithProvider
      options={{
        environmentID: PROJECT_ID,
        cacheFlags: true,
      }}
      flagsmith={flagsmith}>
      <>{children}</>
    </FlagsmithProvider>
  );
};

export default WithFeatureFlag;
