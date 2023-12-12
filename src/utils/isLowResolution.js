import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

const isLowResolution = height <= 667;

export default isLowResolution;
