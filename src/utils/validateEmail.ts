import { EMAIL_CHECK_REGEXP } from '@common/constants';

const validateEmail = (email: string): boolean => {
  return EMAIL_CHECK_REGEXP.test(email);
};

export default validateEmail;
