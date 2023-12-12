import {Platform} from 'react-native';

const iosFont = (type = '') => `AlmoniDLAAA${type}`;
const androidFont = type => `almoni-dl-aaa-${type}`;

// 100: Thin, Hairline, Ultra-light, Extra-light
// 200: Light
// 300: Book
// 400: Regular, Normal, Plain, Roman, Standard
// 500: Medium
// 600: Semi-bold, Demi-bold
// 700: Bold
// 800: Heavy, Black, Extra-bold
// 900: Ultra-black, Extra-black, Ultra-bold, Heavy-black, Fat, Poster

export default Platform.select({
  android: {
    light: androidFont('light'),
    regular: androidFont('regular'),
    bold: androidFont('bold'),
    black: androidFont('black'),
  },
  ios: {
    light: iosFont('-Light'),
    regular: iosFont(),
    bold: iosFont('-Bold'),
    black: iosFont('-Black'),
  },
});
