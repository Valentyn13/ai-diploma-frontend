import { useShowUpdateAppStore } from '@store/useShowUpdateAppStore';
import {
  getFallbackUrl,
  getUpdateUrl,
  shouldUpdate,
} from '@utils/checkVersion';
import { handleSentryException } from '@utils/sentry-helpers';
import React, { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const StoreUpdate: FC<PropsWithChildren> = () => {
  const { showUpdateModal, setRequestDone, setShowUpdateModal } =
    useShowUpdateAppStore(state => ({ ...state }));

  const checkVersion = useCallback(async () => {
    const needsUpdate = await shouldUpdate();
    setRequestDone(true);
    if (needsUpdate) {
      setShowUpdateModal(true);
    }
  }, []);

  useEffect(() => {
    checkVersion();
  }, [checkVersion]);

  const updateApp = useCallback(async () => {
    try {
      const url = await getUpdateUrl();
      if (url) {
        const canOpen = await Linking.canOpenURL(url);

        if (canOpen) {
          await Linking.openURL(url);
        } else {
          const fallbackUrl = getFallbackUrl();
          if (fallbackUrl) {
            await Linking.openURL(fallbackUrl);
          }
        }
      }
    } catch (error) {
      handleSentryException({ src: 'StoreUpdateModal', error: error as Error });
      console.error('Failed to open URL:', error);
    }
  }, []);

  return (
    <Modal
      statusBarTranslucent
      animationIn="fadeIn"
      isVisible={showUpdateModal}
      backdropOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>עדכון חדש מחכה לכם!</Text>
          <Text style={styles.subtitle}>
            כדי להמשיך להשתמש באפליקציה, נא לעדכן לגרסה החדשה.
          </Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={updateApp} style={styles.button}>
              <Text style={styles.buttonText}>עדכן</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 28,
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#323A47',
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#323A47',
    textAlign: 'center',
    marginTop: 4,
  },
  buttonWrapper: {
    height: 50,
    width: '100%',
    marginTop: 60,
  },
  button: {
    backgroundColor: '#273051',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default StoreUpdate;
