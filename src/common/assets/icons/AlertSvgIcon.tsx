import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const AlertSvgIcon = () => {
  return (
    <Svg width={17} height={17} viewBox="0 0 16 16" fill="none">
      <G clipPath="url(#clip0_3429_2300)">
        <Path
          d="M8 5.333V8m0 2.667h.007M14.667 8A6.667 6.667 0 111.334 8a6.667 6.667 0 0113.333 0z"
          stroke="#F90007"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3429_2300">
          <Path fill="#fff" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default AlertSvgIcon;
