/* eslint-disable react-native/no-inline-styles */
import {
  ButtonTitleSmall,
  CenteredView,
  Icon,
  TouchableCenteredView,
} from '@common/components/Styled';
import React from 'react';
import { FlatList } from 'react-native';

const Option = ({ t, onPress, active }) => (
  <TouchableCenteredView
    style={{ paddingTop: 5, paddingBottom: 5 }}
    onPress={onPress}>
    <ButtonTitleSmall t={t} style={{ fontWeight: active ? '800' : '400' }} />
  </TouchableCenteredView>
);

const BgMusicSelector = ({
  toggleBgMenu,
  whiteColor,
  bgMenuOpen,
  handleBgTrack,
  isPlayingBgMusic,
  currentBgTrack,
  bgTracks,
}) => (
  <CenteredView>
    <TouchableCenteredView
      onPress={toggleBgMenu}
      style={{
        flexDirection: 'row',
        width: 72,
        height: 27,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: whiteColor,
        // margin: dimens.margin,
        zIndex: 2,
      }}>
      <Icon
        name="music"
        color={whiteColor}
        size={16}
        style={{ marginRight: 8 }}
      />
      <Icon name="down" color={whiteColor} size={12} />
    </TouchableCenteredView>
    <CenteredView
      style={{
        position: 'absolute',
        top: 22,
        borderColor: whiteColor,
        borderWidth: 1.5,
        width: 72,
        // paddingTop: 20,
        borderTopWidth: 0,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingBottom: 6,
        display: bgMenuOpen ? 'flex' : 'none',
      }}>
      <FlatList
        style={{ width: '100%', paddingTop: 10 }}
        data={[{ id: -1, name: 'כיבוי' }, ...bgTracks]}
        renderItem={({ item }) => (
          <Option
            t={item.name}
            onPress={() => handleBgTrack(item.id)}
            active={
              isPlayingBgMusic ? currentBgTrack === item.id : item.id === -1
            }
          />
        )}
      />
    </CenteredView>
  </CenteredView>
);

export default BgMusicSelector;
