import theme from '@common/theme';
import {
  Colors,
  Spacings,
  ThemeManager,
  Typography,
} from 'react-native-ui-lib';

Colors.loadColors({
  primaryColor: theme.colors.primaryColor, // Soft Red
  secondaryColor: '#D66366', // Lavenders
  backgroundColor: '#FFF8EE', // Light Beige
  accentColor: '#273051', // Light Peach
  textColor: '#273051', // Dark Blue
  errorColor: '#D66366', // Soft Red for errors
  successColor: '#A395D1', // Lavender for success
  warnColor: '#FFEFD7', // Light Peach for warnings
  borderColor: '#D6D6D6', // Light Grey for borders
  shadowColor: '#000000', // Black for shadows
});

Typography.loadTypographies({
  heading: {
    fontSize: 36,
    fontWeight: '600',
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 34,
    letterSpacing: 0.4,
  },
  body: { fontSize: 18, fontWeight: '400', lineHeight: 24, letterSpacing: 0.3 },
  caption: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.3,
  }, // Style for buttons
  smallText: {
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 16,
    letterSpacing: 0.2,
  }, // Style for smaller text elements
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16,
  section: 24,
  item: 8,
  small: 4,
  large: 32,
});

// Set custom theme for buttons
ThemeManager.setComponentTheme('Button', {
  backgroundColor: Colors.primaryColor,
  borderRadius: 8, // Adjust the border radius for a rounded look
  text70: true, // Example of using a typography style
  paddingV: Spacings.s2, // Vertical padding
  paddingH: Spacings.s3, // Horizontal padding
  color: Colors.black, // Set text color
  labelStyle: Typography.button, // Use the defined button typography
});

export default {
  Colors,
  Typography,
  Spacings,
};
