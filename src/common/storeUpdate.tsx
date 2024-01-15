import { getUpdateUrl, shouldUpdate } from '@utils/checkVersion';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Linking, Modal, Text, TouchableOpacity, View } from 'react-native';

const StoreUpdate: FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const checkVersion = async () => {
    const needsUpdate = await shouldUpdate();
    // if (needsUpdate) {
    //   setShowModal(true);
    // }
  };

  useEffect(() => {
    checkVersion();
  }, []);

  const updateApp = useCallback(async () => {
    const url = await getUpdateUrl();
    if (url) {
      await Linking.openURL(url);
    }
  }, []);

  return (
    <>
      {showModal && (
        <Modal transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                borderRadius: 8,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                יש עדכון
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 4,
                }}>
                {'עדכון חדש זמין בבקשה עדכן לחוויה טובה יותר'}{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,

                  width: '100%',
                  height: 60,
                }}>
                <TouchableOpacity
                  onPress={updateApp}
                  style={{
                    backgroundColor: '#273051',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    marginHorizontal: 30,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    עדכן
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {children}
    </>
  );
};

export default StoreUpdate;
