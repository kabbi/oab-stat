import React, { PropTypes } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import ValidatedControl from './ValidatedControl';
import { BoundFormControl as boundFormControl, FormControlProps } from './Form';

export const ValidatedFormGroup = (props) => {
  const {
    state, onChange, validators, errors, model, renderControl, helpBlock, label, formState,
    ...controlProps,
  } = props;

  const error = (state.touched && state.error) || errors[model];
  let footer = helpBlock;
  if (error && state.touched) {
    footer = Object.values(state.validators).map(({ message }) => message).join(' ');
  }
  return (
    <FormGroup controlId={model} validationState={error ? 'error' : undefined}>
      {label && (
        <ControlLabel>{label}</ControlLabel>
      )}
      {renderControl ? (
        renderControl({ validators, state, formState, onChange })
      ) : (
        <ValidatedControl
          validators={validators}
          state={state}
          formState={formState}
          onChange={onChange}
        >
          <FormControl {...controlProps} />
        </ValidatedControl>
      )}
      <FormControl.Feedback />
      {footer && (
        <HelpBlock>{footer}</HelpBlock>
      )}
    </FormGroup>
  );
};

ValidatedFormGroup.propTypes = {
  model: PropTypes.string,
  errors: PropTypes.any,
  label: PropTypes.node,
  helpBlock: PropTypes.node,
  validators: PropTypes.object,
  renderControl: PropTypes.func,
  ...FormControlProps,
};

ValidatedFormGroup.defaultProps = {
  errors: {},
};

export default boundFormControl(ValidatedFormGroup);
