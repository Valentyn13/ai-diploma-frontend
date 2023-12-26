import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
  <svg width="28" height="90" viewBox="0 0 28 90" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="2" y1="8.74231e-08" x2="2" y2="90" stroke="white" stroke-width="4"/>
  <line x1="26" y1="8.74231e-08" x2="26" y2="90" stroke="white" stroke-width="4"/>
  </svg>
`;

export default props => <SvgXml xml={xml} {...props} />;
