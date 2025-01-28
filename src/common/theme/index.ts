import { Dimensions, Platform } from 'react-native';

const iosFont = () => 'Rubik';
const androidFont = () => 'Rubik';

const fonts = Platform.select({
  android: {
    light: androidFont(),
    regular: androidFont(),
    bold: androidFont(),
    black: androidFont(),
  },
  ios: {
    light: iosFont(),
    regular: iosFont(),
    bold: iosFont(),
    black: iosFont(),
  },
})!;

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const dimens = {
  winWidth,
  winHeight,
  margin: 23,
};

const theme = {
  colors: {
    bgColor: '#FFF8EE',
    itemBgColor: '#DADACB',
    selectedCategoryColor: '#F2D1B2',
    textColor: '#160F29',
    whiteColor: '#FFFFFF',
    blueColor: '#273051',
    titleColor: '#F1F1EA',
    borderColor: '#816F41',
    selectedTabBgColor: '#B8B896',
    separatorColor: '#8B7844',
    buttonColor: '#147677',
    carouselActiveDotColor: '#5F5F5F',
    carouselInactiveDotColor: '#BFB589',
    facebookBgColor: 'rgba(0,120,255,0.73)',
    logoutButtonColor: '#FE7542',
    playerSliderColor: 'rgba(255,255,255,0.34)',
    playerSliderStripColor: '#979797',
    briquette: '#E95A62',
    rawAmethyst: '#504071',
    blackColor: '#000000',
    darkColor: '#160f29',
    mainColor: '#3C2E06',

    // new colors
    light: '#FFF8EE',
    primary: '#273051',
    selected: '#D66366',
    inactive: '#8A8A8A',
  },
  dimens,
  fonts,
};

export default { ...theme };
