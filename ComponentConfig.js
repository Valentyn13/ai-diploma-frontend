// ComponentConfig.js
import { ThemeManager } from 'react-native-ui-lib';

// Card component with rounded corners and shadow
ThemeManager.setComponentTheme('Card', {
  borderRadius: 12,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  backgroundColor: '#FFF8EE',
  padding: 16,
});

// Button component with dynamic styles based on props
ThemeManager.setComponentTheme('Button', (props, context) => {
  if (props.square) {
    return {
      borderRadius: 0,
      backgroundColor: '#D66366',
      color: '#FFF8EE',
      padding: 10,
    };
  }
  if (props.outline) {
    return {
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#A395D1',
      backgroundColor: 'transparent',
      color: '#A395D1',
      padding: 10,
    };
  }
  return {
    borderRadius: 25,
    backgroundColor: '#D66366',
    color: '#FFF8EE',
    padding: 10,
  };
});

// Text component with default color and custom styles
ThemeManager.setComponentTheme('Text', {
  color: '#273051',
  fontSize: 18,
  lineHeight: 24,
});

// TextField component with custom styles
ThemeManager.setComponentTheme('TextField', {
  borderColor: '#D6D6D6',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  color: '#273051',
  placeholderTextColor: '#A395D1',
});

// Avatar component with custom styles
ThemeManager.setComponentTheme('Avatar', {
  size: 50,
  borderRadius: 25,
  backgroundColor: '#A395D1',
});

// Checkbox component with custom styles
ThemeManager.setComponentTheme('Checkbox', {
  borderColor: '#D66366',
  fillColor: '#D66366',
  size: 24,
  borderRadius: 4,
});

// Switch component with custom styles
ThemeManager.setComponentTheme('Switch', {
  onColor: '#A395D1',
  offColor: '#D6D6D6',
  thumbColor: '#FFF8EE',
  borderRadius: 12,
});

// Container component with custom padding
ThemeManager.setComponentTheme('Container', {
  padding: 20,
});

export default ThemeManager;
