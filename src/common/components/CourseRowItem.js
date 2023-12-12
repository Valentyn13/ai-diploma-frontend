import FavoriteIndicator from '@common/components/FavoriteIndicator';
import { SubTitle, Title } from '@common/components/Styled';
import meditationTime from '@utils/meditationTime';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

const Container = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-top: 17px;
  padding-bottom: 9px;
  border-bottom-color: ${({ theme: { colors } }) => colors.borderColor};
  border-bottom-width: 1px;
`;

const TitlesContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  width: 80;
  justify-content: space-between;
`;

const CourseRowItem = ({
  item,
  onPress,
  index,
  isCategoryLocked,
  navigate,
  hasPremium,
}) => {
  // const [isDownloading, setIsDownloading] = React.useState(false);
  // const [downloadProgress, setDownloadProgress] = React.useState();

  const { name, id, duration } = item;

  const onItemPress = () => {
    if (!hasPremium && !isCategoryLocked) {
      navigate('Subscribe2', { item: { name } });
    } else {
      onPress(item);
    }
  };

  // const onDownload = () => {
  //   if (Platform.OS === 'ios') {
  //     doDownload();
  //   } else {
  //     try {
  //       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
  //         title: 'Music',
  //         message: 'App needs access to your Files... ',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }).then(granted => {
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           // console.log('startDownload...');
  //           doDownload();
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  // const doDownload = () => {
  //   setIsDownloading(true);
  //   let pathFile;
  //   if (Platform.OS === 'android') {
  //     pathFile = RNFetchBlob.fs.dirs.DownloadDir;
  //   } else {
  //     pathFile = RNFetchBlob.fs.dirs.DocumentDir;
  //   }
  //   try {
  //     const date = new Date();
  //     RNFetchBlob.config({
  //       fileCache: true,
  //       appendExt: 'mp3',
  //       path: `${pathFile}/${name}.mp3`,
  //       addAndroidDownloads: {
  //         useDownloadManager: true,
  //         notification: true,
  //         title: name,
  //         path: `${pathFile}/${name}.mp3`,
  //       },
  //     })
  //       .fetch('GET', url)
  //       .uploadProgress((written, total) => {})
  //       // listen to download progress event
  //       .progress((received, total) => {
  //         // console.log('progress', received / total)
  //         let progress = (received / total).toFixed(1);
  //         progress *= 100;
  //         setDownloadProgress(progress);
  //       })
  //       .then(res => {
  //         const shareOptions = {
  //           showAppsToView: true,
  //           filename: `${name}.mp3`,
  //           subject: 'רגע',
  //           title: `${name}.mp3`,
  //           message: `${name}.mp3`,
  //           url: Platform.OS === 'android' ? `file://${res.path()}` : res.path(),
  //         };
  //         setIsDownloading(false);
  //         setDownloadProgress(false);
  //         Share.open(shareOptions)
  //           .then(res => {
  //             console.log(res);
  //             setIsDownloading(false);
  //           })
  //           .catch(err => {
  //             err && console.log(err);
  //             setIsDownloading(false);
  //           });
  //       });
  //   } catch (error) {
  //     setIsDownloading(false);
  //     console.log('error', error);
  //   }
  // };

  return (
    <Container onPress={onItemPress}>
      <TitlesContainer>
        <Title t={`${index + 1}. ${name}`} />
        <SubTitle t={meditationTime(duration)} />
      </TitlesContainer>
      <IconsContainer>
        <View />
        {/* {isDownloading&&Platform.OS==="ios" ? <Text style={{fontSize:14,paddingTop:5,textAlign:'center',fontWeight:'500'}}>{downloadProgress}%</Text>: <TouchableIcon name="download" size={28} onPress={onDownload} />} */}
        <FavoriteIndicator id={id} dark />
      </IconsContainer>
    </Container>
  );
};

CourseRowItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default memo(CourseRowItem);
