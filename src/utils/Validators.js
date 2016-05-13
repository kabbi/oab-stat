import { ValidationMessages } from 'constants/Messages';

export const nonEmpty = value => {
  if (!value || !value.toString().trim()) {
    return {
      error: true,
      message: ValidationMessages.Required,
    };
  }
  return {
    error: false,
  };
};

export const required = value => {
  if (value === undefined) {
    return {
      error: true,
      message: ValidationMessages.Required,
    };
  }
  return {
    error: false,
  };
};
