import { Alert } from 'react-native';

// import I18n from '@utils/I18n';
// import knownErrors from './knownErrors';

const alert = err => {
  Alert.alert(
    '',
    // I18n.t(err, {defaultValue: I18n.t(knownErrors[err], {defaultValue: err})}),
    err,
  );
};

export default alert;
