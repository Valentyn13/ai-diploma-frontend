import {Dimensions} from 'react-native';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const dimens = {
  winWidth,
  winHeight,
  margin: 23,
};

export default dimens;
