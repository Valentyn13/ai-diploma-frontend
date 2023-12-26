import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
  <svg width="60" height="91" viewBox="0 0 60 91" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="path-1-inside-1_2472_773" fill="white">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 90.7759L60 45.7759L0 0.775879V90.7759Z"/>
  </mask>
  <path d="M60 45.7759L63 49.7759L68.3333 45.7759L63 41.7759L60 45.7759ZM0 90.7759H-5V100.776L3 94.7759L0 90.7759ZM0 0.775879L3 -3.22412L-5 -9.22412L-5 0.775879H0ZM57 41.7759L-3 86.7759L3 94.7759L63 49.7759L57 41.7759ZM-3 4.77588L57 49.7759L63 41.7759L3 -3.22412L-3 4.77588ZM5 90.7759V0.775879H-5V90.7759H5Z" fill="white" mask="url(#path-1-inside-1_2472_773)"/>
  </svg>
`;

export default props => <SvgXml xml={xml} {...props} />;
