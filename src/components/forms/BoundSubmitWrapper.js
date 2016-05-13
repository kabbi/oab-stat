import React, { Children, PropTypes } from 'react';

import { BoundFormControl as boundFormControl } from './FormDataBinder';

export const BoundSubmitWrapper = ({ children, onSubmit }) => {
  const child = Children.only(children);
  return React.cloneElement(child, {
    ...child.props,
    onClick: event => {
      event.preventDefault();
      onSubmit();
    },
  });
};

BoundSubmitWrapper.propTypes = {
  children: PropTypes.element,
  onSubmit: PropTypes.func,
};

export default boundFormControl(BoundSubmitWrapper);
