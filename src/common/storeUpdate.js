/* eslint-disable react-native/no-color-literals */

/* eslint-disable react-native/no-inline-styles */
import { checkVersion } from '@utils/checkVersion';
import React from 'react';
import {
  Linking,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function StoreUpdate({ children }) {
  const [newUpdate, setNewUpdate] = React.useState({
    state: false,
    storeUrl: null,
  });

  React.useEffect(() => {
    async function checkForUpdates() {
      const version = await checkVersion();

      if (version && version.isNeeded) {
        setNewUpdate({
          state: true,
          ...version,
        });
      }
    }
    // TODO: remove the comment here
    // checkForUpdates();
  }, []);

  const toggleUpdate = () => {
    setNewUpdate({
      state: false,
      storeUrl: null,
    });
  };

  const downloadNewVersion = () => {
    Linking.openURL(newUpdate.storeUrl);
  };

  return (
    <>
      {newUpdate.state && (
        <Modal visible transparent>
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
                  //   fontFamily: 'Quicksand',
                  fontSize: 17,
                  fontWeight: '700',
                  //   color: theme.BLACK
                }}>
                יש עדכון
              </Text>
              <Text
                style={{
                  //   fontFamily: 'Quicksand',
                  fontSize: 14,
                  textAlign: 'center',
                  marginTop: 4,
                  //   color: theme.BLACK
                }}>
                {'עדכון חדש זמין בבקשה עדכן לחוויה טובה יותר'}{' '}
              </Text>
              {/* <Text
                  style={{
                    fontWeight: '700',
                  }}>
                  ({newUpdate.latestVersion})
                </Text>{' '} 
                {'update-desc-2'}{' '}
                <Text
                  style={{
                    fontWeight: '700',
                  }}>
                  {Platform.OS === 'ios' ? 'app-store' : 'play-store'}
                </Text>{' '}
                {'update-desc-3'}
              </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,

                  width: '100%',
                  height: 60,
                }}>
                <TouchableOpacity
                  onPress={() => downloadNewVersion()}
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
                      paddingVertical: 20,
                    }}>
                    {' '}
                    {` ${Platform.OS === 'ios' ? 'לְעַדְכֵּן' : 'לְעַדְכֵּן'}`}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => toggleUpdate()}
                  style={{
                    backgroundColor: 'red',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    marginHorizontal: 30,
                  }}>
                  <Text style={{textAlign: 'center', color: 'white', paddingVertical: 20}}>{'לבטל'}</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </Modal>
      )}
      {children}
    </>
  );
}

export default StoreUpdate;
