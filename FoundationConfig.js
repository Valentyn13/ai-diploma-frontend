import { Colors, Spacings, Typography } from 'react-native-ui-lib';

Colors.loadColors({
  secondaryColor: '#D66366', // Soft Red
  primaryColor: '#A395D1', // Lavender
  backgroundColor: '#FFF8EE', // Light Beige
  accentColor: '#FFEFD7', // Light Peach
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

export default {
  Colors,
  Typography,
  Spacings,
};
